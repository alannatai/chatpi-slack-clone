import { pipe } from 'ramda';
import produce from 'immer';

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
const initialMessages = [
  {
    _id: 1,
    text: 'Hello developer!',
    createdAt: new Date(),

    user: {
      _id: 1,
      avatar: images.profile,
      name: 'Tester Test',
    },
  },
];

// TODO, nest messages under chat
const { initialState, selectors } = createSelectorsAndState(threadNamespace, {
  isSending: false,
  recipient: {},
  messages: initialMessages,
  // messageList: initialMessages.result,
  // messageEntities: initialMessages.entities.dbObject,
  // messageList: [],
  // messageEntities: {},
});

export const threadSelectors = {
  ...selectors,
  latestMessage: (state) => state[threadNamespace].messages?.[0],
};

const c = threadConstants;

const mapMessage = ({ messageRes, user }) => ({
  _id: messageRes?.id,
  text: messageRes?.text,
  createdAt: messageRes?.inserted_at,
  user: {
    _id: messageRes?.user_id,
    name: user?.username,
    avatar: user?.imageUrl,
  },
});

const injectMessageM = (state, { messageRes, user }) =>
  pipe(mapMessage, state.messages.unshift)({ messageRes, user });

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
    case c.RECEIVE_MESSAGES: {
      action.payload.messages.forEach((messageRes) =>
        injectMessageM(state, { messageRes, user: action.payload.user }),
      );
      return state;
    }
    case c.RECEIVE_MESSAGE: {
      // this takes a user object, but we should actually just call user by id, else user changes are hard to propagate
      injectMessageM(state, {
        messageRes: action.payload.message,
        user: action.payload.user,
      });
      return state;
    }
    default:
      return state;
  }
});

export default threadReducer;
