import produce from 'immer';

import { baseSelectors } from '../base/ducks';
import images from '../../constants/images';
import {
  createConstantsAndActions,
  createSelectorsAndState,
} from '../../utils/reduxHelpers';

export const threadNamespace = 'thread';

const constArr = [
  'INITIALIZE',
  'SEND_MESSAGE',
  'SEND_MESSAGE_SUCCESS',
  'RECEIVE_MESSAGE',
  'RECEIVE_MESSAGES',
  'SEND_MESSAGE_ERROR',
  'CLOSE',

  // TEMPORARY
  'CLEAR_MESSAGES',
];

export const {
  constants: threadConstants,
  actions: threadActions,
} = createConstantsAndActions(threadNamespace, constArr);

// TEMPORARY
const initialMessages = [];

// TODO, nest messages under chat
const { initialState, selectors } = createSelectorsAndState(threadNamespace, {
  isSending: false,
  recipient: {},
  messages: {},
  presences: {},
});

export const threadSelectors = {
  ...selectors,
  latestMessage: (chatId) => (state) =>
    state[threadNamespace].messages[chatId]?.[0],
  messagesByChatId: (chatId) => (state) => selectors.messages(state)[chatId],
};

const c = threadConstants;

const transformMessageResToMessage = ({ messageRes, user }) => ({
  _id: messageRes?.id,
  text: messageRes?.text,
  createdAt: messageRes?.inserted_at,
  user: {
    _id: messageRes?.user_id,
    name: user?.username,
    avatar: user?.imageUrl,
  },
});

// Messages are sent by default as short, and no progress bar, if an error returns or
// TODO A large message like an attachment needs to show progress + status
const threadReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case c.SEND_MESSAGE:
      state.isSending = true;
      return state;
    case c.SEND_MESSAGE_SUCCESS:
      state.isSending = false;
      return state;
    case c.CLEAR_MESSAGES:
      return initialState;
    case c.SEND_MESSAGE_ERROR:
      state.isSending = false;
      return state;
    case c.PRESENCE_CHANGE:
      state.isSending = false;
      return state;
    case c.RECEIVE_MESSAGES: {
      const { chatId } = action.payload;
      if (!state.messages[chatId]) state.messages[chatId] = initialMessages;

      action.payload.messages.forEach((messageRes) => {
        const message = transformMessageResToMessage({
          messageRes,
          user: action.payload.user,
        });
        state.messages[chatId].unshift(message);
      });
      return state;
    }
    case c.RECEIVE_MESSAGE: {
      // this takes a user object, but we should actually just call user by id, else user changes are hard to propagate
      const { chatId } = action.payload;
      if (!state.messages[chatId]) state.messages[chatId] = initialMessages;

      const message = transformMessageResToMessage({
        messageRes: action.payload.message,
        user: action.payload.user,
      });
      state.messages[chatId].unshift(message);
      return state;
    }
    default:
      return state;
  }
});

export default threadReducer;
