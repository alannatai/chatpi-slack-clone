import { merge, pathOr, pipe } from 'ramda';
import { schema, normalize } from 'normalizr';

export const dbSchema = new schema.Entity(
  'dbObject',
  {},
  { idAttribute: 'id' },
);

export const normalizeBase = (payload) => normalize(payload, [dbSchema]);

// this version uses mutation: only for use with immer
const updateState = (state, prefix = '') => (normalized) => {
  state[`${prefix}Entities`] = merge(
    pathOr({}, [`${prefix}Entities`], state),
    normalized.entities.dbObject,
  );
  state[`${prefix}List`] = pathOr([], [`${prefix}List`], state).concat(
    normalized.result,
  );
};

export const normalizeAndUpdate = (state, prefix) =>
  pipe(normalizeBase, updateState(state, prefix));

/* Specific types */

const userSchema = new schema.Entity('users', {}, { idAttribute: 'id' });

const chatSchema = new schema.Entity(
  'chats',
  {},
  { idAttribute: 'chatpiChatId' },
);

// Define your article
export const base = new schema.Entity(
  'base',
  {
    members: [userSchema],
    chats: [chatSchema],
  },
  { idAttribute: 'id' },
);
