import PropTypes from 'prop-types';
import React from 'react';

import DirectMessagesScreen from './DirectMessagesScreen';

function DirectMessagesScreenContainer(props) {
  const _props = {};

  const methods = {};

  return <DirectMessagesScreen {...{ ..._props, ...methods }} />;
}

DirectMessagesScreenContainer.propTypes = {
  navigation: PropTypes.navigation,
};

export default DirectMessagesScreenContainer;
