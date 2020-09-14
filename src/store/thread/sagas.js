import { PURGE } from 'redux-persist';
import {
  all,
  call,
  fork,
  put,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';
import { Auth } from 'aws-amplify';
import { eventChannel as EventChannel } from 'redux-saga';
import { Connection } from '@knotfive/chatpi-client-js/src/chatpi-client';

import { getCurrentBase, getCurrentChatId } from '../base/helpers';
import { threadActions, threadConstants, threadSelectors } from './ducks';
import apiService, { apiCall } from '../../services/api/apiService';
import { baseSelectors } from '../base/ducks';
import envService from '../../services/env/envService';

const PRESENCE_CHANGE = 'PRESENCE_CHANGE';
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

function* catchUpMessagesForBase() {
  const chatId = yield select(baseSelectors.currentChatId);
  const messages = yield select(threadSelectors.messages);

  if (messages.length === 0) {
    yield apiCall(
      {
        call: apiService.chat.get,
        *onSuccess(response) {
          yield put(
            threadActions.receiveMessages({
              messages: response.messages,
            }),
          );
        },
      },
      `/v1/chats/${chatId}/messages`,
    );
  } else {
    const latestMessage = yield select(threadSelectors.latestMessage);
    const { createdAt } = latestMessage;

    yield apiCall(
      {
        call: apiService.chat.get,
        *onSuccess(response) {
          yield put(
            threadActions.receiveMessages({
              messages: response.messages,
            }),
          );
        },
      },
      `/v1/chats/${chatId}/messages?query=after&inserted_at=${createdAt}`,
    );
  }
}

function* handleSuccessfulChatpiEvent(event) {
  switch (event.type) {
    case PRESENCE_CHANGE:
      // const user = yield select(baseSelectors.getUser(event.message.user_id));
      // yield put(threadActions.precenseChange({ presence: event.presence, user }));
      break;
    case RECEIVE_MESSAGE: {
      const user = yield select(baseSelectors.getUser(event.payload.user_id));
      yield put(threadActions.receiveMessage({ message: event.payload, user }));
      break;
    }
    default:
  }
}

// TODO push tokens
//
function* subscribeChatpiEvent(messagesChannel) {
  while (true) {
    const { ok, type, payload, reason } = yield take(messagesChannel);
    if (!ok || !payload) {
      console.warn(reason); //eslint-disable-line
    } else {
      yield handleSuccessfulChatpiEvent({ type, payload });
    }
  }
}

function* watchForSendMessage(connection, action) {
  const currentChatId = yield getCurrentChatId();

  try {
    connection.sendMessage({
      channelId: currentChatId,
      message: {
        text: action.payload[0].text,
      },
    });
  } catch (e) {
    console.warn(e); //eslint-disable-line
  }
}

function* watchForChannelClose(channel) {
  yield take([threadConstants.CLOSE]);
  channel.close();
}

function* startChannel() {
  const { accessToken } = yield Auth.currentSession();
  yield getCurrentBase();
  const channelIds = yield select(baseSelectors.allChatIds);

  if (channelIds.length === 0) {
    return;
  }

  const userToken = '10';

  let connection;

  const messagesChannel = new EventChannel((emitter) => {
    connection = new Connection({
      url: envService.getConfig().chatpiSocketUrl,
      apiKey: envService.getConfig().apiKey,
      userToken,
      authorizationToken: accessToken.jwtToken,
      channelIds,
      onPresenceChange: (channelId, presence) => {
        emitter({ ok: true, type: PRESENCE_CHANGE, payload: presence });
      },
      onMessageReceive: (channelId, message) => {
        emitter({ ok: true, type: RECEIVE_MESSAGE, payload: message });
      },
    });
    return () => {
      console.log('disconnect');
    };
  });

  yield all([
    call(subscribeChatpiEvent, messagesChannel),
    takeEvery(threadConstants.SEND_MESSAGE, watchForSendMessage, connection),
    takeEvery(threadConstants.CLOSE, watchForChannelClose, connection),
  ]);
}

export default function* threadSaga() {
  yield put({
    type: PURGE,
    key: 'reduxState', // Whatever you chose for the "key" value when initialising redux-persist in the **persistCombineReducers** method - e.g. "root"
    result: () => null, // Func expected on the submitted action.
  });
  yield fork(catchUpMessagesForBase);
  yield startChannel();
}
