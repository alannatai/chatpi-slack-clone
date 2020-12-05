import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import sharedStyles from '../constants/sharedStyles';
import colors from '../constants/colors';

const styles = {
  icon: {
    marginRight: 15,
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
  paddingVertical: {
    paddingVertical: 20,
  },
  bottomDivider: {
    borderBottomColor: colors.gray4,
    borderBottomWidth: 1,
  },
};

export default function LogoTextLinks({ buttons, textStyle, icon, divider, paddingHorizontal, paddingVertical }) {
  return (
    <View style={[divider ? styles.bottomDivider : null, paddingHorizontal ? styles.paddingHorizontal : null, paddingVertical ? styles.paddingVertical : null]}>
      {buttons.map(button => (
        <TouchableOpacity style={sharedStyles.logoTextLinkContainer} onPress={button.onPress} key={button.text}>
          <View style={styles.icon}>{icon ? icon : button.icon}</View>
          <Text style={textStyle}>{button.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

LogoTextLinks.propTypes = {
  textStyle: PropTypes.object,
};
