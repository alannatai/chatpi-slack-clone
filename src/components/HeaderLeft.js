import { Keyboard, TouchableOpacity, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

import gStyle from '../constants/gStyle';
import SvgSlackLogo from './icons/Svg.SlackLogo';

function HeaderLeft() {
  const navigation = useNavigation();
  return (
    <View style={gStyle.containerNavBlocks}>
      <TouchableOpacity
        activeOpacity={gStyle.activeOpacity}
        hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
        onPress={() => {
          Keyboard.dismiss();
          navigation.openDrawer();
        }}
      >
        <SvgSlackLogo />
      </TouchableOpacity>
    </View>
  );
}

HeaderLeft.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
};

export default HeaderLeft;
