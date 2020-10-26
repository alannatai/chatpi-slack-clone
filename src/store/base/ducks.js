import { normalize } from 'normalizr';
import produce from 'immer';
import { path } from 'ramda';

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
  'PRESENCE_CHANGE',
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
  currentBase: (state) =>
    path(
      [baseNamespace, 'baseEntities', baseSelectors.currentBaseId(state)],
      state,
    ),
  currentChatId: (state) => baseSelectors.currentBase(state)?.chats?.[0],
  currentBaseName: (state) => baseSelectors.currentBase(state)?.name,
  allChatIds: (state) => Object.keys(baseSelectors.chatEntities(state)),
  getUser: (authKey) => (state) => baseSelectors.userEntities(state)?.[authKey],
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
      state.baseEntities = obj.entities.base;
      state.bases = obj.result;
      state.userEntities = obj.entities.user;
      state.chatEntities = obj.entities.chat;
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
