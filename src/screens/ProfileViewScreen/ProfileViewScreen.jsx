import { Text, View, Image } from 'react-native';
import React from 'react';

import sharedStyles from '../../constants/sharedStyles';

const styles = {
  image: {
    height: '45%',
    width: '100%',
  },
};

export default function ProfileViewScreen({ myProfile }) {
  return (
    <View style={sharedStyles.containerDark}>
      <Image source={{ uri: myProfile.imageUrl }} style={styles.image} />
      <Text>{myProfile.email}</Text>
    </View>
  );
}

ProfileViewScreen.propTypes = {};
