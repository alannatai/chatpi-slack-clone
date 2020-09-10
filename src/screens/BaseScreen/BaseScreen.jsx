import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { gStyle } from '../../constants';
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

export default function BaseScreen(props) {
  return (
    <BaseBottomTabNavigatorLayout>
      <View style={styles.container}>
        <Text style={[styles.text]}>BaseScreen</Text>
        <TouchableOpacity
          style={{ padding: 20 }}
          onPress={() => props.goToChat()}
        >
          <Text style={gStyle.listText}>Chats</Text>
        </TouchableOpacity>
      </View>
    </BaseBottomTabNavigatorLayout>
  );
}

BaseScreen.propTypes = {
  goToChat: PropTypes.func,
};
