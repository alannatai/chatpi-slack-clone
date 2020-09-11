import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { HeaderBackButton } from '@react-navigation/stack';
import React from 'react';

import colors from '../../constants/colors';
import { baseSelectors } from '../../store/base/ducks';
import gStyle from '../../constants/gStyle';
import SvgBell from '../../components/icons/Svg.Bell';
import SvgDotsVertical from '../../components/icons/Svg.DotsVertical';
import { NavigationPropType } from '../../utils/types';

const HeaderRight = ({ navigation }) => (
  <View style={[gStyle.containerNavBlocks, gStyle.flexRowCenter]}>
    <TouchableOpacity
      activeOpacity={gStyle.activeOpacity}
      hitSlop={{ top: 10, left: 16, bottom: 10, right: 8 }}
      onPress={() => navigation.navigate('Notifications')}
      style={gStyle.mR16}
    >
      <SvgBell />
    </TouchableOpacity>
    <TouchableOpacity
      activeOpacity={gStyle.activeOpacity}
      hitSlop={{ top: 10, left: 8, bottom: 10, right: 16 }}
      onPress={() => navigation.navigate('ChatActions')}
      style={gStyle.mR16}
    >
      <SvgDotsVertical />
    </TouchableOpacity>
  </View>
);

HeaderRight.propTypes = {
  // required
  navigation: NavigationPropType.isRequired,
};

const styles = {
  text: {
    ...gStyle.textLarsBold18,
    fontWeight: '500',
    color: colors.black,
  },
  centerText: {
    width: '50%',
    alignItems: 'center',
    bottom: 0,
    marginHorizontal: '25%',
    position: 'absolute',
  },
};

export default function ChatHeader() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const baseName = useSelector(baseSelectors.currentBaseName);
  return (
    <View
      style={{
        paddingTop: insets.top,
        position: 'relative ',
      }}
    >
      <View style={[styles.centerText, gStyle.containerNavBlocks]}>
        <Text style={styles.text}>{baseName}</Text>
      </View>
      <HeaderBackButton
        labelVisible={false}
        onPress={() => navigation.goBack()}
      />
      <View style={{ position: 'absolute', top: insets.top, right: 0 }}>
        <HeaderRight navigation={navigation} />
      </View>
    </View>
  );
}
