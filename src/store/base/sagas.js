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
      call: apiService.core.get,
      *onSuccess(response) {
        yield put(
          baseActions.receiveBases({
            bases: response.list,
          }),
        );
      },
    },
    '/v1/base/',
  );
}

function* getMessagesForBase() {
  const chatId = yield select(baseSelectors.currentChatId);
  yield apiCall(
    {
      call: apiService.chat.get,
      *onSuccess(response) {
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

function* getCurrentChatDetails() {
  yield all([getChatForBase, getMessagesForBase]);
}

function* init() {
  yield getBases();
  yield getCurrentChatDetails();
}

export default function* basesSaga() {
  yield init();
  yield fork(watchActionsLatest, [
    [baseConstants.GET_CHAT_FOR_BASE, getCurrentChatDetails],
  ]);
}
