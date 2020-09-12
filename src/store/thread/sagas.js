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
import {
  BROADCAST_ACTION,
  createChannel,
  sendMessageAsync,
} from '@knotfive/chatpi-client-js/src/chatpi-client';

import { getCurrentChatId } from '../base/helpers';
import apiService, { apiCall } from '../../services/api/apiService';
import { baseSelectors } from '../base/ducks';
import envService from '../../services/env/envService';
import { threadActions, threadConstants } from './ducks';

// retrieve past messages
function* getMessagesForBase() {
  const chatId = yield select(baseSelectors.currentChatId);
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
}

// TODO push tokens
//
function* subscribeMessageUpdates(messagesChannel) {
  while (true) {
    const { ok, message, reason } = yield take(messagesChannel);
    if (!ok) {
      console.warn(reason); //eslint-disable-line
    }

    const user = yield select(baseSelectors.getUser(message.user_id));
    yield put(threadActions.receiveMessage({ message, user }));
  }
}

function* watchForSendMessage(channel, action) {
  try {
    yield sendMessageAsync({
      channel,
      action: BROADCAST_ACTION,
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
  const currentChatId = yield getCurrentChatId();

  const userToken = 10;

  const channel = yield createChannel({
    channelId: currentChatId,
    url: envService.getConfig().chatpiSocketUrl,
    userToken,
    authorizationToken: accessToken.jwtToken,
  });

  const messagesChannel = new EventChannel((emitter) => {
    channel.on(BROADCAST_ACTION, (message) => emitter({ ok: true, message })); //eslint-disable-line

    return () => channel.leave();
  });

  yield all([
    call(subscribeMessageUpdates, messagesChannel),
    takeEvery(threadConstants.SEND_MESSAGE, watchForSendMessage, channel),
    takeEvery(threadConstants.CLOSE, watchForChannelClose, channel),
  ]);
}

export default function* threadSaga() {
  yield put({
    type: PURGE,
    key: 'reduxState', // Whatever you chose for the "key" value when initialising redux-persist in the **persistCombineReducers** method - e.g. "root"
    result: () => null, // Func expected on the submitted action.
  });
  yield fork(getMessagesForBase);
  yield startChannel();
}
