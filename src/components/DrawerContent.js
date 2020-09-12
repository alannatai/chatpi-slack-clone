import { StyleSheet, View } from 'react-native';
import React from 'react';

import gStyle from '../constants/gStyle';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  drawerContentContainer: {
    alignItems: 'center',
    backgroundColor: colors.purple,
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    ...gStyle.textLarsBold18,
    color: colors.white,
  },
});

export default function DrawerContent() {
  return <View style={styles.drawerContentContainer} />;
}
