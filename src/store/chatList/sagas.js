import { put, fork } from 'redux-saga/effects';

import { chatListActions } from './ducks';
import apiService, { apiCall } from '../../services/api/apiService';

/**
 * Get all chats to display
 */
function* getChats() {
  console.log('hi');
  yield apiCall(
    {
      call: apiService.chat.get,
      *onSuccess(response) {
        console.log(response);
        yield put(
          chatListActions.receiveChats({
            chats: response.chats,
          }),
        );
      },
    },
    '/v1/chats',
  );
}

export default function* chatListSaga() {
  yield fork(getChats);
}
