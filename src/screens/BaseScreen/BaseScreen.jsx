import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import { Feather } from '@expo/vector-icons';

import BaseBottomTabNavigatorLayout from '../../layouts/BaseBottomTabNavigatorLayout';
import colors from '../../constants/colors';
import sharedStyles from '../../constants/sharedStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  headerTextContainer: {
    marginLeft: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  categoryText: {
    ...sharedStyles.textWhiteBold12,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hash: {
    marginRight: 10,
  },
  text: {
    ...sharedStyles.text14,
    color: colors.lightGray,
  },
});

export default function BaseScreen({ currentBaseId, baseEntities, goToChat }) {
  const base = baseEntities[currentBaseId];
  return (
    <BaseBottomTabNavigatorLayout>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image source={{ uri: base.imageUrl }} style={styles.image} />
          <View style={styles.headerTextContainer}>
            <Text style={sharedStyles.textWhiteBold20}>{base.name}</Text>
            <Text style={styles.text}>score: {base.score}</Text>
          </View>
        </View>
        <Text style={styles.categoryText}>Channels</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => goToChat()}>
          <Feather style={styles.hash} name="hash" size={18} color={colors.white} />
          <Text style={styles.text}>General</Text>
        </TouchableOpacity>
        <Text style={styles.categoryText}>Direct Messages</Text>
      </View>
    </BaseBottomTabNavigatorLayout>
  );
}

BaseScreen.propTypes = {
  goToChat: PropTypes.func,
};
