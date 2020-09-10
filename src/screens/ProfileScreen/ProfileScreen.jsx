import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import gStyle from '../../constants/gStyle';
import BaseBottomTabNavigatorLayout from '../../layouts/BaseBottomTabNavigatorLayout';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    ...gStyle.textLarsBold18,
    color: colors.white,
  },
});

export default function ProfileScreen(props) {
  return (
    <BaseBottomTabNavigatorLayout>
      <View style={styles.container}>
        <Text style={styles.text}>Profile</Text>
      </View>
    </BaseBottomTabNavigatorLayout>
  );
}

ProfileScreen.propTypes = {};
