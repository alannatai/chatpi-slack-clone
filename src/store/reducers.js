import { combineReducers } from 'redux';

import alertReducer, { alertNamespace } from './alert/ducks';
import errorReducer, { errorNamespace } from './error/ducks';
import threadReducer, { threadNamespace } from './thread/ducks';

// import appReducer, { appNamespace } from './app/ducks';
// import profileReducer, { profileNamespace } from './profile/ducks';

// ---plop_append_import---

export default function createReducer(asyncReducers) {
  const combinedReducer = combineReducers({
    // [appNamespace]: appReducer,
    [alertNamespace]: alertReducer,
    [errorNamespace]: errorReducer,
    // ---plop_append_reducer---
    [threadNamespace]: threadReducer,
    // [appNamespace]: appReducer,
    // [profileNamespace]: profileReducer,
    ...asyncReducers,
  });

  return (state, action) =>
    // state as undefined will reset store
    // combinedReducer(
    //   action.type === authConstants.LOGOUT
    //     ? {
    //         [appNamespace]: {
    //           appLoaded: true,
    //           loadingActions: {},
    //         },
    //         [alertNamespace]: undefined,
    //         [errorNamespace]: undefined,
    //         [pushTokenNamespace]: undefined,
    //         [creditConsentNamespace]: undefined,
    //         [profileNamespace]: undefined,
    //       }
    //     : state,
    //   action,
    // );
    combinedReducer(state, action);
}
