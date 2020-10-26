import React from 'react';
import { connect } from 'react-redux';

import BaseScreen from './BaseScreen';
import { NavigationPropType } from '../../utils/types';
import { baseSelectors } from '../../store/base/ducks';

function BaseScreenContainer(props) {
  const _props = {
    currentBaseId: props.currentBaseId,
  };

  const methods = {
    goToChat: () => props.navigation.jumpTo('Chat'),
  };

  return <BaseScreen {...{ ..._props, ...methods }} />;
}

BaseScreenContainer.propTypes = {
  navigation: NavigationPropType,
};

const mapStateToProps = (state) => ({
  currentBaseId: baseSelectors.currentBaseId(state),
});

export default connect(mapStateToProps)(BaseScreenContainer);
