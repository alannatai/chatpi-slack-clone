import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CloseButton from '../components/CloseButton';
import gStyle from '../constants/gStyle';
import { alertActions, alertSelectors } from '../store/alert/ducks';
import colors from '../constants/colors';

const ALERT_PADDING = 20;

const style = {
  alertModalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  alertContainer: {
    ...gStyle.flexRowCenter,
    paddingVertical: ALERT_PADDING,
    paddingLeft: ALERT_PADDING,
    paddingRight: ALERT_PADDING - 10,
  },
  alertText: {
    maxWidth: '90%',
    marginRight: 15,
    ...gStyle.textCiruBook12,
    color: colors.white,
  },
};

// TODO, should make this generic toast, not just alert modal, because it allows for success now
function AlertToast(props) {
  const insets = useSafeAreaInsets();
  return (
    <Modal
      backdropOpacity={0.1}
      isVisible={!!props.alert?.k}
      onBackdropPress={props.clearAlerts}
      style={style.alertModalContainer}
      onSwipeComplete={props.clearAlerts}
      swipeDirection={['down']}
    >
      <View
        style={[
          style.alertContainer,
          {
            backgroundColor: colors[props.alert?.type] || colors.grey,
            paddingBottom: ALERT_PADDING + insets.bottom - 10,
          },
        ]}
      >
        <Text style={style.alertText}>{props.alert.message}</Text>
        <CloseButton onPress={props.clearAlerts} />
      </View>
    </Modal>
  );
}

AlertToast.propTypes = {
  clearAlerts: PropTypes.func,
  alert: PropTypes.objectOf(PropTypes.string),
};

const mapStateToProps = (state) => ({
  alert: alertSelectors.alert(state),
});

const mapDispatchToProps = {
  clearAlerts: alertActions.clearAlerts,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertToast);
