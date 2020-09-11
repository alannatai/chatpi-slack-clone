import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import ChatHeader from './ChatHeader';
import { MessagePropType } from '../../utils/types';
import AccessoryBar from '../../components/AccessoryBar';
import Message from '../../components/Message';

export default function ChatScreen({
  chatId,
  messages,
  sendMessage,
  getChatForBase,
}) {
  useEffect(() => {
    getChatForBase({ chatId });
  }, [chatId, getChatForBase]);

  return (
    <>
      <ChatHeader />
      <GiftedChat
        alwaysShowSend
        messages={messages}
        onSend={(msgs) => sendMessage(msgs)}
        renderAccessory={(_props) => <AccessoryBar {..._props} />}
        renderMessage={(_props) => <Message {..._props} />}
        renderSend={() => null}
        user={{ _id: 1 }}
      />
    </>
  );
}

ChatScreen.propTypes = {
  getChatForBase: PropTypes.func,
  sendMessage: PropTypes.func,
  messages: PropTypes.arrayOf(MessagePropType),
  chatId: PropTypes.string,
};
