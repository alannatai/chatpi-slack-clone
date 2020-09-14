import { pipe } from 'ramda';
import { combineReducers } from 'redux';

import { ignoreOutside } from '../utils/reduxHelpers';
import baseReducer, { baseNamespace } from './base/ducks';
import appReducer, { appConstants, appNamespace } from './app/ducks';
import alertReducer, { alertNamespace } from './alert/ducks';
import errorReducer, { errorNamespace } from './error/ducks';
import threadReducer, { threadNamespace } from './thread/ducks';

// ---plop_append_import---

export const signedInReducers = {
  // ---plop_append_reducer---
  [threadNamespace]: threadReducer,
  [baseNamespace]: baseReducer,
};

export default function createReducer(asyncReducers) {
  const createCombinedReducer = pipe(
    // ignoreOutside(baseNamespace, ['PRESENCE_CHANGE']),
    combineReducers,
  );

  // const combinedReducer = createCombinedReducer({
  //   [appNamespace]: appReducer,
  //   [alertNamespace]: alertReducer,
  //   [errorNamespace]: errorReducer,
  //   ...signedInReducers,
  //   ...asyncReducers,
  // });

  const combinedReducer = combineReducers({
    [appNamespace]: appReducer,
    [alertNamespace]: alertReducer,
    [errorNamespace]: errorReducer,
    ...signedInReducers,
    ...asyncReducers,
  });

  return (state, action) =>
    // state as undefined will reset store
    combinedReducer(
      action.type === appConstants.SIGNED_OUT
        ? {
            [appNamespace]: undefined,
            [alertNamespace]: undefined,
            [errorNamespace]: undefined,
            [threadNamespace]: undefined,
          }
        : state,
      action,
    );
}
