import produce from 'immer';

import { ERROR, SUCCESS } from '../../constants/status';
import { errorConstants } from '../error/ducks';
import {
  createConstantsAndActions,
  createSelectorsAndState,
} from '../../utils/reduxHelpers';

export const alertNamespace = 'alerts';

const constArr = ['SET_SUCCESS_MESSAGE', 'CLEAR_ALERTS'];

export const {
  constants: alertConstants,
  actions: alertActions,
} = createConstantsAndActions(alertNamespace, constArr);

const { initialState, selectors } = createSelectorsAndState(alertNamespace, {
  alert: {},
});

export const alertSelectors = {
  ...selectors,
};

const c = alertConstants;

const mapError = (payload) => {
  switch (true) {
    case payload?.status === 401:
      return {
        message: 'Signed out, please sign in again',
      };
    case !!payload?.error?.message === 'Networking issue':
    default:
      return {
        message: "Sorry, it seems like we're having some issues right now",
      };
  }
};

const alertReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case c.SET_SUCCESS_MESSAGE: {
      state.alert = {
        type: SUCCESS,
        ...action.payload,
      };
      return state;
    }
    case errorConstants.SET_ERROR: {
      state.alert = {
        type: ERROR,
        ...mapError(action.payload),
      };
      return state;
    }
    case c.CLEAR_ALERTS: {
      return initialState;
    }
    default:
      return state;
  }
});

export default alertReducer;
