import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { Feather, AntDesign } from '@expo/vector-icons';

import BaseBottomTabNavigatorLayout from '../../layouts/BaseBottomTabNavigatorLayout';
import colors from '../../constants/colors';
import sharedStyles from '../../constants/sharedStyles';
import FloatingActionButton from '../../components/FloatingActionButton';
import CreateMsgIcon from '../../assets/icons/CreateMsgIcon';
import LogoTextLinkItem from '../../components/LogoTextLinkItem';

const mockChannels = ['General', 'random', 'Sphere Cube', 'BayBo'];

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  headerTextContainer: {
    marginLeft: 20,
  },
  headerText: {
    ...sharedStyles.textWhiteBold20,
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  scoreBox: {
    width: 80,
    flex: 1,
    backgroundColor: colors.white10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  categoryContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    ...sharedStyles.textWhiteBold12,
    marginVertical: 10,
  },
  text: {
    ...sharedStyles.text14,
    color: colors.lightGray,
  },
});

export default function BaseScreen({ currentBaseId, baseEntities, userEntities, goToChat }) {
  const navigation = useNavigation();
  const base = baseEntities[currentBaseId];
  return (
    <BaseBottomTabNavigatorLayout>
      <View style={styles.headerContainer}>
        <Image source={{ uri: base.imageUrl }} style={styles.image} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{base.name}</Text>
          <TouchableOpacity style={sharedStyles.buttonSmall}>
            <Text style={sharedStyles.text14}>Score</Text>
          </TouchableOpacity>
          <View style={styles.scoreBox}>
            <Text style={sharedStyles.textLightGray14}>{base.score}</Text>
          </View>
        </View>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>Channels</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChatActions')}
        >
          <AntDesign name='plus' size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
      {mockChannels.map(channel => (
        <LogoTextLinkItem
          icon={<Feather style={styles.icon} name='hash' size={18} color={colors.white} />}
          text={channel}
          textStyle={sharedStyles.textLightGray14}
          onPress={() => goToChat()}
        />
      ))}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>Direct Messages</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChatActions')}
        >
          <AntDesign name='plus' size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
      {base.members.map(memberId => {
        const member = userEntities[memberId];
        return (
          <TouchableOpacity style={sharedStyles.logoTextLinkContainer} onPress={() => goToChat()} key={member.id}>
            <View style={{ ...sharedStyles.statusOnline, marginLeft: 5, marginRight: 15 }} />
            <Text style={sharedStyles.textLightGray14}>{member.username}</Text>
          </TouchableOpacity>
        );
      })}
      <FloatingActionButton
        icon={<CreateMsgIcon height={20} />}
        onPress={() => navigation.navigate('ChatActions')}
      />
    </BaseBottomTabNavigatorLayout>
  );
}

BaseScreen.propTypes = {
  goToChat: PropTypes.func,
};
