import React from 'react';

import { NavigationPropType } from '../../utils/types';
import ProfileScreen from './ProfileScreen';

function ProfileScreenContainer(props) {
  const _props = {};

  const methods = {};

  return <ProfileScreen {...{ ..._props, ...methods }} />;
}

ProfileScreenContainer.propTypes = {
  navigation: NavigationPropType,
};

export default ProfileScreenContainer;
