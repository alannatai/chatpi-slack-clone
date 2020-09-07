import produce from 'immer';

import {
  createConstantsAndActions,
  createSelectorsAndState,
} from '../../utils/reduxHelpers';
import { normalizeBase } from '../../utils/schema';

export const baseNamespace = 'base';

const constArr = [
  'MARK_SEEN',
  'RECEIVE_CHAT',
  'RECEIVE_MESSAGES',
  'GET_CHAT_FOR_BASE',
  'RECEIVE_BASES',
];

export const {
  constants: baseConstants,
  actions: baseActions,
} = createConstantsAndActions(baseNamespace, constArr);

export const { initialState, selectors } = createSelectorsAndState(
  baseNamespace,
  {
    currentBaseId: '',
    bases: [],
    chats: {},
    messages: {},
    messageEntities: {},
    baseEntities: {},
    hasLoaded: false,
  },
);

export const baseSelectors = {
  ...selectors,
  currentBase: (state) => state.baseEntities?.currentBaseId,
  currentChatId: (state) => baseSelectors.currentBase(state)?.chats?.[0],
};

const c = baseConstants;

const baseReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case c.RECEIVE_CHAT: {
      state.chats[action.payload.chatId] = action.payload.chat;
      return state;
    }
    case c.RECEIVE_MESSAGES: {
      const dbObj = normalizeBase(action.payload.messages);
      state.messageEntities[action.payload.chatId] = dbObj.entities;
      state.messages[action.payload.chatId] = dbObj.result;
      state.hasLoaded = true;
      return state;
    }
    case c.RECEIVE_BASES: {
      const dbObj = normalizeBase(action.payload.bases);
      state.baseEntities = dbObj.entities;
      state.bases = dbObj.result;
      state.hasLoaded = true;
      return state;
    }
    case c.MARK_SEEN:
      state.chatEntities[action.payload.id].isSeen = true;
      return state;
    default:
      return state;
  }
});

export default baseReducer;
