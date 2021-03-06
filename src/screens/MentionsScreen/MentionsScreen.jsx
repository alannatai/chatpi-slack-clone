import { Text, View } from 'react-native';
import React from 'react';

import gStyle from '../../constants/gStyle';
import BaseBottomTabNavigatorLayout from '../../layouts/BaseBottomTabNavigatorLayout';
import colors from '../../constants/colors';

export default function MentionsScreen() {
  return (
    <BaseBottomTabNavigatorLayout>
      <View style={styles.container}>
        <Text style={styles.text}>Mentions</Text>
      </View>
    </BaseBottomTabNavigatorLayout>
  );
}

MentionsScreen.propTypes = {};

const styles = {
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    ...gStyle.textLarsBold18,
    color: colors.white,
  },
};