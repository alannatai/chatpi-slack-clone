import { View } from 'react-native';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HeaderLeft from '../../components/HeaderLeft';
import HeaderRight from '../../components/HeaderRight';
import { MessagePropType } from '../../utils/types';
import AccessoryBar from '../../components/AccessoryBar';
import Message from '../../components/Message';

export default function ChatScreen({
  chatId,
  messages,
  sendMessage,
  getChatForBase,
}) {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getChatForBase({ chatId });
  }, [chatId, getChatForBase]);

  return (
    <>
      <View style={{ paddingTop: insets.top, flex: 1, position: 'relative ' }}>
        <HeaderLeft />
        <View style={{ position: 'absolute', top: insets.top, right: 0 }}>
          <HeaderRight screenProps={{}} />
        </View>
      </View>
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
