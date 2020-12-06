import React from 'react';
import { connect } from 'react-redux';

import { NavigationPropType, UserPropType } from '../../utils/types';
import ProfileViewScreen from './ProfileViewScreen';
import { cachedProfilesSelectors } from '../../store/cachedProfiles/ducks';

function ProfileViewScreenContainer(props) {
  const _props = {
    myProfile: props.myProfile,
  };

  const methods = {};

  return <ProfileViewScreen {...{ ..._props, ...methods }} />;
}

ProfileViewScreenContainer.propTypes = {
  navigation: NavigationPropType,
  myProfile: UserPropType,
};

const mapStateToProps = (state) => ({
  myProfile: cachedProfilesSelectors.myProfile(state),
});

export default connect(mapStateToProps)(ProfileViewScreenContainer);
