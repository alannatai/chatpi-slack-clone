import { assoc } from 'ramda';

import {
  createConstantsAndActions,
  createSelectorsAndState,
} from '../../utils/reduxHelpers';

export const errorNamespace = 'error';

const constArr = ['SET_ERROR', 'SET_SUCCESS_MESSAGE', 'CLEAR_ERROR'];

export const {
  constants: errorConstants,
  actions: errorActions,
} = createConstantsAndActions(errorNamespace, constArr);

const { initialState, selectors } = createSelectorsAndState(errorNamespace, {
  error: { k: undefined },
});

export const errorSelectors = {
  ...selectors,
};

const c = errorConstants;

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case c.SET_ERROR: {
      return assoc('error', action.payload, state);
    }
    case c.CLEAR_ERROR: {
      return initialState;
    }
    default:
      return state;
  }
}
