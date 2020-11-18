import React from 'react';

import { NavigationPropType } from '../../utils/types';
import MentionsScreen from './MentionsScreen';

function MentionsScreenContainer(props) {
  const _props = {};

  const methods = {};

  return <MentionsScreen {...{ ..._props, ...methods }} />;
}

MentionsScreenContainer.propTypes = {
  navigation: NavigationPropType,
};

export default MentionsScreenContainer;
