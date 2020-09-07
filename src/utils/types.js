import PropTypes from 'prop-types';

export const MessagePropType = PropTypes.shape({
  id: PropTypes.string,
  text: PropTypes.string,
  user_id: PropTypes.string,
  chat_id: PropTypes.string,
});
