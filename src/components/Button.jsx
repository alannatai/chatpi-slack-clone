import { color } from 'react-native-reanimated';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { SMALL_HIT_SLOP } from '../constants/HitSlops';
import { StylePropType } from '../utils/types';
import fonts from '../constants/fonts';

const basicButtonStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  padding: 13,
  borderRadius: 20,
  zIndex: 10,
};

const buttonStyle = {
  outline: {
    ...basicButtonStyle,
    borderColor: color['basic-700'],
    borderWidth: 1,
  },
  filled: {
    ...basicButtonStyle,
    backgroundColor: color.primary,
  },
  ghost: {
    ...basicButtonStyle,
    flexDirection: 'row',
  },
};

const buttonTextStyle = {
  outline: {
    font: fonts.circularProBold,
    color: color['basic-1000'],
    textTransform: 'uppercase',
  },
  filled: {
    font: fonts.circularProBold,
    color: color.green,
    textTransform: 'uppercase',
  },
  ghost: {
    font: fonts.circularProBold,
    color: color.primary,
    paddingLeft: 6,
  },
};

const iconStyle = {
  ghost: {
    tintColor: color.primary,
    width: 28,
    height: 28,
  },
};

export default function Button(props) {
  const { Icon } = props;
  return (
    <TouchableOpacity
      hitSlop={SMALL_HIT_SLOP}
      style={[buttonStyle[props.type], props.buttonStyle]}
      onPress={props.onPress}
      activeOpacity={props.type === 'ghost' ? 0.3 : 0.7}
    >
      {!props.isLoading ? (
        <>
          {Icon && <Icon {...iconStyle[props.type]} />}
          <Text style={[buttonTextStyle[props.type], props.buttonTextStyle]}>
            {props.children}
          </Text>
        </>
      ) : (
        <ActivityIndicator size="small" color={color['basic-100']} />
      )}
    </TouchableOpacity>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  children: PropTypes.node,
  buttonStyle: StylePropType,
  buttonTextStyle: StylePropType,
  Icon: PropTypes.func,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  type: 'filled',
};
