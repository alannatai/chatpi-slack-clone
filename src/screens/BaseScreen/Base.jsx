import React from 'react';

import BaseScreen from './BaseScreen';
import { NavigationPropType } from '../../utils/types';

function BaseScreenContainer(props) {
  const _props = {};

  const methods = {
    goToChat: () => props.navigation.jumpTo('Chat'),
  };

  return <BaseScreen {...{ ..._props, ...methods }} />;
}

BaseScreenContainer.propTypes = {
  navigation: NavigationPropType,
};

export default BaseScreenContainer;
