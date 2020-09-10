import React from 'react';
import PropTypes from 'prop-types';

import ChatActionsScreen from './ChatActionsScreen';
import { NavigationPropType } from '../../utils/types';

function ChatActionsScreenContainer(props) {
  const _props = {};

  const methods = {};

  return <ChatActionsScreen {...{ ..._props, ...methods }} />;
}

ChatActionsScreenContainer.propTypes = {
  navigation: NavigationPropType,
};

export default ChatActionsScreenContainer;
