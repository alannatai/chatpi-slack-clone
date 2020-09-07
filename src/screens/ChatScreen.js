import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';

import { baseSelectors } from '../store/base/ducks';
import Message from '../components/Message';
import { threadActions, threadSelectors } from '../store/thread/ducks';
import AccessoryBar from '../components/AccessoryBar';

function ChatScreen({ chatId, messages, sendMessage, getChatForBase }) {
  useEffect(() => getChatForBase({ chatId }), [chatId, getChatForBase]);

  return (
    <GiftedChat
      alwaysShowSend
      messages={messages}
      onSend={(msgs) => sendMessage(msgs)}
      renderAccessory={(_props) => <AccessoryBar {..._props} />}
      renderMessage={(_props) => <Message {..._props} />}
      renderSend={() => null}
      user={{ _id: 1 }}
    />
  );
}

ChatScreen.propTypes = {
  getChatForBase: PropTypes.func,
  sendMessage: PropTypes.func,
  messages: PropTypes.array,
  chatId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  messages: threadSelectors.messages(state),
  chatId: baseSelectors.currentChatId(state),
});

const mapDispatchToProps = {
  sendMessage: threadActions.sendMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
