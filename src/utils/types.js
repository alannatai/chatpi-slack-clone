import PropTypes from 'prop-types';

export const MessagePropType = PropTypes.shape({
  id: PropTypes.string,
  text: PropTypes.string,
  user_id: PropTypes.string,
  chat_id: PropTypes.string,
});

export const UserPropType = PropTypes.shape({
  uuid: PropTypes.string,
  createdAt: PropTypes.number,
  updatedAt: PropTypes.number,
  authKey: PropTypes.string,
  username: PropTypes.string,
  email: 'd0nkers',
  score: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  imageUrl: PropTypes.string,
});

export const BasePropType = PropTypes.shape({
  uuid: PropTypes.string,
  createdAt: PropTypes.number,
  updatedAt: PropTypes.number,
  name: PropTypes.string,
  score: 0.0,
  imageUrl: PropTypes.string,
  members: PropTypes.arrayOf(PropTypes.string),
  chats: PropTypes.arrayOf(PropTypes.string),
});

export const NavigationPropType = PropTypes.object; // eslint-ignore-line

export const StylePropType = PropTypes.object; // eslint-ignore-line
