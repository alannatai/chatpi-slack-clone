import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BaseScreen from './BaseScreen';
import { NavigationPropType, BaseEntitiesPropType, UserEntitiesPropType } from '../../utils/types';
import { baseSelectors } from '../../store/base/ducks';

function BaseScreenContainer(props) {
  const _props = {
    currentBaseId: props.currentBaseId,
    baseEntities: props.baseEntities,
    userEntities: props.userEntities,
  };

  const methods = {
    goToChat: () => props.navigation.jumpTo('Chat'),
  };

  return <BaseScreen {...{ ..._props, ...methods }} />;
}

BaseScreenContainer.propTypes = {
  navigation: NavigationPropType,
  currentBaseId: PropTypes.string,
  baseEntities: BaseEntitiesPropType,
  userEntities: UserEntitiesPropType,
};

const mapStateToProps = (state) => ({
  currentBaseId: baseSelectors.currentBaseId(state),
  baseEntities: baseSelectors.baseEntities(state),
  userEntities: baseSelectors.userEntities(state),
});

export default connect(mapStateToProps)(BaseScreenContainer);
