import { put, select, fork } from 'redux-saga/effects';

import apiService, { apiCall } from '../../services/api/apiService';
import { watchActionsLatest } from '../../utils/watchActions';
import {
  cachedProfilesConstants,
  cachedProfilesActions,
  cachedProfilesSelectors,
} from './ducks';

function* getUser() {
  yield apiCall(
    {
      call: apiService.core.get,
      *onSuccess(response) {
        yield put(
          cachedProfilesActions.receiveUser({
            myProfile: response,
          }),
        );
      },
    },
    '/v1/user/me',
  );
}

function* fetchPerson({ id }) {
  return { profile: undefined };
}

export function* getCachedProfile({ id }) {
  if (!id) return false;
  const profileSelector = yield select(cachedProfilesSelectors.profile);
  const profile = profileSelector(id);
  if (!profile) {
    const response = yield fetchPerson({ id });
    if (response && response.profile) {
      yield put(
        cachedProfilesActions.upsertProfile({ profile: response.profile }),
      );
    }
    return response?.profile;
  }
  return profile;
}

export default function* cachedProfilesSaga() {
  // yield put(cachedProfilesActions.cleanExpired());
  // yield fork(watchActionsLatest, [
  //   [cachedProfilesConstants.GET_PROFILE, getCachedProfile],
  // ]);
  yield getUser();
}
