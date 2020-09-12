import { select, take } from 'redux-saga/effects';

import { baseConstants, baseSelectors } from './ducks';

export function* getCurrentBase() {
  const currentBase = yield select(baseSelectors.currentBase);

  if (currentBase) {
    return currentBase;
  }

  yield take(baseConstants.RECEIVE_BASES);

  return yield select(baseSelectors.currentBase);
}

export function* getCurrentChatId() {
  yield getCurrentBase();
  return yield select(baseSelectors.currentChatId);
}
