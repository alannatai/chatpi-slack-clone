import { Text, View, Image, TextInput } from 'react-native';
import React from 'react';
import { Feather, AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import sharedStyles from '../../constants/sharedStyles';
import colors from '../../constants/colors';
import BaseBottomTabNavigatorLayout from '../../layouts/BaseBottomTabNavigatorLayout';
import LogoTextLinks from '../../components/LogoTextLinks';
import { UserPropType } from '../../utils/types';

const styles = {
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 60,
    width: 60,
    marginRight: 15,
    borderRadius: 8,
  },
};

export default function ProfileScreen({ myProfile }) {
  const navigation = useNavigation();
  const profileButtons = [
    {
      text: 'Do not disturb',
      icon: <Feather name='bell-off' size={18} color={colors.white} />,
      onPress: () => console.log('do not disturb'),
    },
    {
      text: 'Set yourself as away',
      icon: <Entypo name='notifications-off' size={18} color={colors.white} />,
      onPress: () => console.log('away'),
    },
    {
      text: 'Saved items',
      icon: <Feather name='bookmark' size={18} color={colors.white} />,
      onPress: () => console.log('saved items'),
    },
    {
      text: 'View profile',
      icon: <AntDesign name='user' size={18} color={colors.white} />,
      onPress: () => navigation.navigate('ProfileView'),
    },
    {
      text: 'Notifications',
      icon: <Entypo name='notification' size={18} color={colors.white} />,
      onPress: () => console.log('notifications'),
    },
    {
      text: 'Preferences',
      icon: <Feather name='settings' size={18} color={colors.white} />,
      onPress: () => console.log('preferences'),
    },
  ];
  return (
    <BaseBottomTabNavigatorLayout style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: myProfile.imageUrl }} style={styles.image} />
        <View>
          <Text style={{ ...sharedStyles.textLightGray16, fontWeight: '600' }}>{myProfile.username}</Text>
          <Text style={sharedStyles.textLightGray12}>Active</Text>
        </View>
      </View>
      <View style={sharedStyles.borderBottomGray}>
        <TextInput
          placeholder="What's your status?"
          onChangeText={(text) => console.log(text)}
          style={{ ...sharedStyles.textInput, marginBottom: 15 }}
          placeholderTextColor={colors.gray7}
        />
      </View>
      <LogoTextLinks
        buttons={profileButtons.slice(0, 2)}
        textStyle={sharedStyles.textLightGray14}
        divider
        paddingVertical
      />
      <LogoTextLinks
        buttons={profileButtons.slice(2, 6)}
        textStyle={sharedStyles.textLightGray14}
        paddingVertical
      />
    </BaseBottomTabNavigatorLayout>
  );
}

ProfileScreen.propTypes = {
  myProfile: UserPropType,
};
