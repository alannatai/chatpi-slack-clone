import { all } from 'ramda';
import { select, put, fork } from 'redux-saga/effects';

import { baseActions, baseConstants, baseSelectors } from './ducks';
import { watchActionsLatest } from '../../utils/watchActions';
import apiService, { apiCall } from '../../services/api/apiService';

/**
 * Get all chats to display
 */
function* getBases() {
  yield apiCall(
    {
      call: apiService.chat.get,
      *onSuccess(response) {
        console.log(response);
        yield put(
          baseActions.receiveBases({
            chats: response.chats,
          }),
        );
      },
    },
    '/v1/chats',
  );
}

function* getMessagesForBase() {
  const chatId = yield select(baseSelectors.currentChatId);
  yield apiCall(
    {
      call: apiService.core.get,
      *onSuccess(response) {
        console.log(response);
        yield put(
          baseActions.receiveMessages({
            messages: response.messages,
          }),
        );
      },
    },
    `/v1/chats/${chatId}/`,
  );
}

function* getChatForBase() {
  yield apiCall(
    {
      call: apiService.core.get,
      *onSuccess(response) {
        console.log(response);
        yield put(
          baseActions.receiveChat({
            messages: response.messages,
          }),
        );
      },
    },
    '/v1/chats/',
  );
}

function* getAllChatDetails() {
  yield all([getChatForBase, getMessagesForBase]);
}

export default function* basesSaga() {
  yield fork(getBases);
  yield fork(watchActionsLatest, [
    [baseConstants.GET_CHAT_FOR_BASE, getAllChatDetails],
  ]);
}
