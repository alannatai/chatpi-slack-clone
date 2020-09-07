import { Auth } from 'aws-amplify';
import { take, all, fork, cancel, retry } from 'redux-saga/effects';

import { appConstants } from './app/ducks';
import threadSaga from './thread/sagas';
import baseSaga from './base/sagas';

const MAX_TRIES = 3;
const RETRY_DELAY = 200;

// import appSaga from './app/sagas';
// import profileSaga from './profile/sagas';

const defaultSagas = [threadSaga];

const signedInSagas = [
  // ---plop_append_saga---
  baseSaga,
  // appSaga,
  // pushTokenSaga,
  // creditConsentSaga,
  // profileSaga,
];

export default function* rootSaga() {
  yield retry(MAX_TRIES, RETRY_DELAY, function* () {
    // TODO, only fail if n failures within a certain timespan
    try {
      yield fork(function* () {
        yield all(
          defaultSagas.map((saga) => retry(MAX_TRIES, RETRY_DELAY, saga)),
        );
      });

      while (true) {
        const { accessToken } = yield Auth.currentSession();

        if (!accessToken) {
          yield take(appConstants.SIGNED_IN);
        }

        console.log('hi');
        const signedInTasks = yield fork(function* () {
          yield all(
            signedInSagas.map((saga) => retry(MAX_TRIES, RETRY_DELAY, saga)),
          );
        });

        yield take(appConstants.SIGNED_OUT);

        yield cancel(signedInTasks);
      }
    } catch (e) {
      console.warn(e);
    }
  });
}
