import { put } from 'redux-saga/effects';

import { baseActions } from './ducks';
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

export default function* basesSaga() {
  yield getBases();
}
