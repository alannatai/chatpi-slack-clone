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

import { threadActions, threadConstants, threadSelectors } from './ducks';
import { getCurrentChatId } from '../base/helpers';
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

function* handleSuccessfulChatpiEvent(message) {
  switch (message.type) {
    case PRESENCE_CHANGE:
      console.log(message);
      // yield put(threadActions.receiveMessage({ message, user }));
      break;
    case RECEIVE_MESSAGE: {
      const user = yield select(baseSelectors.getUser(message.user_id));
      yield put(threadActions.receiveMessage({ message, user }));
      break;
    }
    default:
  }
}

// TODO push tokens
//
function* subscribeChatpiEvent(messagesChannel) {
  while (true) {
    const { ok, message, reason } = yield take(messagesChannel);
    if (!ok || !message) {
      console.warn(reason); //eslint-disable-line
    } else {
      yield handleSuccessfulChatpiEvent(message);
    }
  }
}

function* watchForSendMessage(connection, action) {
  const currentChatId = yield getCurrentChatId();

  try {
    connection.sendMessageAsync({
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
  const channelIds = yield select(baseSelectors.allChatIds);
  console.log(channelIds);

  if (channelIds.length === 0) {
    return;
  }

  const userToken = '10';

  let emitter;

  const messagesChannel = new EventChannel((_emitter) => {
    emitter = _emitter;
  });

  const connection = new Connection({
    url: envService.getConfig().chatpiSocketUrl,
    apiKey: envService.getConfig().apiKey,
    userToken,
    authorizationToken: accessToken.jwtToken,
    channelIds,
    onPresenceChange: (channelId, presence) => {
      emitter({ ok: true, type: PRESENCE_CHANGE, presence });
    },
    onMessageReceive: (channelId, message) => {
      emitter({ ok: true, type: RECEIVE_MESSAGE, message });
    },
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
