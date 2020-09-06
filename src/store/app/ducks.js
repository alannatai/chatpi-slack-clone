import produce from 'immer';

import amplifyAuthState from '../../constants/amplifyAuthState';
import {
  createConstantsAndActions,
  createSelectorsAndState,
} from '../../utils/reduxHelpers';

export const appNamespace = 'app';

const constArr = ['SIGNED_IN', 'SIGNED_OUT'];

export const {
  constants: appConstants,
  actions: appActions,
} = createConstantsAndActions(appNamespace, constArr);

export const authStateToActionDict = {
  [amplifyAuthState.SignedIn]: appActions.signedIn,
  [amplifyAuthState.SignedOut]: appActions.signedOut,
};

const { initialState, selectors } = createSelectorsAndState(appNamespace, {
  signedIn: false,
});

export const appSelectors = {
  ...selectors,
};

const c = appConstants;

const appReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case c.SIGNED_IN: {
      state.signedIn = true;
      return state;
    }
    case c.SIGNED_OUT: {
      state.signedOut = true;
      return state;
    }
    default:
      return state;
  }
});

export default appReducer;
