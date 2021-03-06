import React from 'react';
import { connect } from 'react-redux';

import { NavigationPropType } from '../../utils/types';
import ProfileScreen from './ProfileScreen';
import { cachedProfilesSelectors } from '../../store/cachedProfiles/ducks';

function ProfileScreenContainer(props) {
  const _props = {
    myProfile: props.myProfile,
  };

  const methods = {};

  return <ProfileScreen {...{ ..._props, ...methods }} />;
}

ProfileScreenContainer.propTypes = {
  navigation: NavigationPropType,
};

const mapStateToProps = (state) => ({
  myProfile: cachedProfilesSelectors.myProfile(state),
});

export default connect(mapStateToProps)(ProfileScreenContainer);
