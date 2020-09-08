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
    case payload?.status === 409:
      return {
        k: 'email_already_taken',
      };
    case payload?.error === 'not_signed_in':
      return {
        k: 'not_signed_in',
      };
    case payload.error === 'generic_error_00':
      return {
        k: 'generic_error_00',
      };
    case !!payload?.error.message === 'Networking issue':
      return {
        k: 'api_error',
        message: "Sorry, it seems like we're having some issues right now",
      };
    default:
      return {
        k: 'generic_error_00',
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
