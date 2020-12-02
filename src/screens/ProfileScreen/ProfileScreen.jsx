import { Text, View, Image, TextInput } from 'react-native';
import React from 'react';
import { Feather, AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import sharedStyles from '../../constants/sharedStyles';
import colors from '../../constants/colors';
import BaseBottomTabNavigatorLayout from '../../layouts/BaseBottomTabNavigatorLayout';
import LogoTextLinkItem from '../../components/LogoTextLinkItem';

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
  settingsSection: {
    borderTopWidth: 1,
    borderTopColor: colors.gray4,
    marginTop: 15,
    paddingHorizontal: 0,
  },
};

export default function ProfileScreen({ myProfile }) {
  const navigation = useNavigation();
  const profileButtons = [
    {
      name: 'Do not disturb',
      icon: <Feather name='bell-off' size={18} color={colors.white} />,
      onPress: () => console.log('do not disturb'),
    },
    {
      name: 'Set yourself as away',
      icon: <Entypo name='notifications-off' size={18} color={colors.white} />,
      onPress: () => console.log('do not disturb'),
    },
    {
      name: 'Saved items',
      icon: <Feather name='bookmark' size={18} color={colors.white} />,
      onPress: () => console.log('do not disturb'),
    },
    {
      name: 'View profile',
      icon: <AntDesign name='user' size={18} color={colors.white} />,
      onPress: () => navigation.navigate('ProfileView'),
    },
    {
      name: 'Notifications',
      icon: <Entypo name='notification' size={18} color={colors.white} />,
      onPress: () => console.log('do not disturb'),
    },
    {
      name: 'Preferences',
      icon: <Feather name='settings' size={18} color={colors.white} />,
      onPress: () => console.log('do not disturb'),
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
      <TextInput
        placeholder="What's your status?"
        onChangeText={(text) => console.log(text)}
        style={sharedStyles.textInput}
        placeholderTextColor={colors.gray7}
      />
      <View style={{ ...sharedStyles.settingsSection, ...styles.settingsSection }}>
        {profileButtons.slice(0, 2).map(button => (
          <LogoTextLinkItem
            key={button.name}
            icon={button.icon}
            text={button.name}
            textStyle={sharedStyles.textLightGray14}
            onPress={button.onPress}
          />
        ))}
      </View>
      <View style={{ ...sharedStyles.settingsSection, borderBottomWidth: 0, paddingHorizontal: 0 }}>
        {profileButtons.slice(2, 6).map(button => (
          <LogoTextLinkItem
            key={button.name}
            icon={button.icon}
            text={button.name}
            textStyle={sharedStyles.textLightGray14}
            onPress={button.onPress}
          />
        ))}
      </View>
    </BaseBottomTabNavigatorLayout>
  );
}

ProfileScreen.propTypes = {};
