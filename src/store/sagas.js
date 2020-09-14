import { Auth } from 'aws-amplify';
import { take, all, fork, cancel } from 'redux-saga/effects';

import { retryHoc } from '../utils/reduxHelpers';
import { appConstants } from './app/ducks';
import threadSaga from './thread/sagas';
import baseSaga from './base/sagas';

const MAX_TRIES = 3;
const RETRY_DELAY = 200;

// import appSaga from './app/sagas';
// import profileSaga from './profile/sagas';

const defaultSagas = [];

const signedInSagas = [
  // ---plop_append_saga---
  baseSaga,
  threadSaga,
  // appSaga,
  // pushTokenSaga,
  // creditConsentSaga,
  // profileSaga,
];

const retry = retryHoc(MAX_TRIES, RETRY_DELAY);

export default function* rootSaga() {
  yield retry(function* () {
    // TODO, only fail if n failures within a certain timespan
    try {
      yield fork(function* () {
        yield all(defaultSagas.map((saga) => retry(saga)));
      });

      while (true) {
        const { accessToken } = yield Auth.currentSession();

        if (!accessToken) {
          yield take(appConstants.SIGNED_IN);
        }

        const signedInTasks = yield fork(function* () {
          yield all(signedInSagas.map((saga) => retry(saga)));
        });

        yield take(appConstants.SIGNED_OUT);

        yield cancel(signedInTasks);
      }
    } catch (e) {
      console.warn(e);
    }
  });
}
