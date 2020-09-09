import PropTypes from 'prop-types';
import React from 'react';

import ProfileScreen from './ProfileScreen';

function ProfileScreenContainer(props) {
  const _props = {};

  const methods = {};

  return <ProfileScreen {...{ ..._props, ...methods }} />;
}

ProfileScreenContainer.propTypes = {
  navigation: PropTypes.navigation,
};

export default ProfileScreenContainer;
