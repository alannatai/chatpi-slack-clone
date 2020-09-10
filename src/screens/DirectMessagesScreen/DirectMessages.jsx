import React from 'react';

import { NavigationPropType } from '../../utils/types';
import DirectMessagesScreen from './DirectMessagesScreen';

function DirectMessagesScreenContainer(props) {
  const _props = {};

  const methods = {};

  return <DirectMessagesScreen {...{ ..._props, ...methods }} />;
}

DirectMessagesScreenContainer.propTypes = {
  navigation: NavigationPropType,
};

export default DirectMessagesScreenContainer;
