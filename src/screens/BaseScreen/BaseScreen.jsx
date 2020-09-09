import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import BaseBottomTabNavigatorLayout from '../../layouts/BaseBottomTabNavigatorLayout';
import { device, gStyle } from '../../constants';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  pagination: {
    backgroundColor: colors.white10,
    borderRadius: 12,
    left: device.width / 2 - 26,
    paddingVertical: 2,
    bottom: device.iPhoneX ? 36 : 24,
    width: 54,
  },
  slide: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    ...gStyle.textLarsBold18,
    color: colors.white,
  },
});

export default function BaseScreen(props) {
  return (
    <BaseBottomTabNavigatorLayout>
      <View style={styles.slide}>
        <Text style={styles.text}>BaseScreen</Text>
        <TouchableOpacity onPress={() => props.goToChat()}>
          <Text>Hi</Text>
        </TouchableOpacity>
      </View>
    </BaseBottomTabNavigatorLayout>
  );
}

BaseScreen.propTypes = {
  goToChat: PropTypes.func,
};
