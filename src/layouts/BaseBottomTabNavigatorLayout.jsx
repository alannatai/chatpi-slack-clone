import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import React from 'react';

import colors from '../constants/colors';
import HeaderLeft from '../components/HeaderLeft';
import { StylePropType } from '../utils/types';

const styles = {
  scrollView: {
    paddingBottom: 20,
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 15,
    flex: 1,
  },
  background: {
    backgroundColor: colors.black85,
  },
};

export default function BaseBottomTabNavigatorLayout({
  ImageComponent,
  BeforeImageComponent,
  AfterImageComponent,
  AfterActionComponent,
  ...props
}) {
  const navigation = useNavigation();
  const ContainerView = props.disableScroll ? View : ScrollView;
  return (
    <ContainerView
      style={[
        styles.scrollView,
        { backgroundColor: colors.black85 },
        props.containerStyle,
      ]}
    >
      <SafeAreaView>
        <HeaderLeft navigation={navigation} />
        <View style={styles.contentContainer}>{props.children}</View>
      </SafeAreaView>
    </ContainerView>
  );
}

BaseBottomTabNavigatorLayout.propTypes = {
  onActionPress: PropTypes.func,
  disableScroll: PropTypes.bool,
  actionMsg: PropTypes.string,

  BeforeImageComponent: PropTypes.func,
  ImageComponent: PropTypes.func,
  AfterImageComponent: PropTypes.func,
  AfterActionComponent: PropTypes.func,
  containerStyle: StylePropType,
  children: PropTypes.node,
};
