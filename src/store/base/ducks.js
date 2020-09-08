import { normalize } from 'normalizr';
import produce from 'immer';

import { base, normalizeAndUpdate } from '../../utils/schema';
import {
  createConstantsAndActions,
  createSelectorsAndState,
} from '../../utils/reduxHelpers';

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
    userEntities: {},
    chatEntities: {},
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
      normalizeAndUpdate(state, 'messages')(action.payload.messages);
      state.hasLoaded = true;
      return state;
    }
    case c.RECEIVE_BASES: {
      const obj = normalize(action.payload.bases, [base]);
      state.baseEntities = obj.entities.bases;
      state.bases = obj.result;
      state.userEntities = obj.entities.users;
      state.chatEntities = obj.entities.chats;
      state.hasLoaded = true;
      if (!state.currentBaseId) {
        const [currentBaseId] = state.bases;
        state.currentBaseId = currentBaseId;
      }
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
