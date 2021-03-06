import PropTypes from 'prop-types';
import React from 'react';
import { } from 'react-redux';

import AlertToast from '../components/AlertToast';
import { errorActions, errorSelectors } from '../store/error/ducks';

function AlertContainer(props) {
  return <AlertToast error={props.error} onClose={() => props.clearError()} />;
}

AlertContainer.propTypes = {
  clearAlert: PropTypes.func,
};

const mapStateToProps = (state) => ({
  error: errorSelectors.error(state),
});

const mapDispatchToProps = {
  clearAlert: errorActions.clearAlert,
};
export default (mapStateToProps, mapDispatchToProps)(AlertContainer);
