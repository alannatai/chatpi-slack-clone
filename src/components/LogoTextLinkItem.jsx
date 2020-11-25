import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import sharedStyles from '../constants/sharedStyles';

const styles = {
  icon: {
    marginRight: 15,
  },
};

export default function LogoTextLinkItem({ onPress, icon, text, textStyle }) {
  return (
    <TouchableOpacity style={sharedStyles.logoTextLinkContainer} onPress={onPress}>
      <View style={styles.icon}>{icon}</View>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}

LogoTextLinkItem.propTypes = {
  onPress: PropTypes.func,
  icon: PropTypes.element,
  text: PropTypes.string,
  textStyle: PropTypes.object,
};
