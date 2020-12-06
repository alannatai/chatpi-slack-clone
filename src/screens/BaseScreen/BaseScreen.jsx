import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Feather, AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import BaseBottomTabNavigatorLayout from '../../layouts/BaseBottomTabNavigatorLayout';
import colors from '../../constants/colors';
import sharedStyles from '../../constants/sharedStyles';
import FloatingActionButton from '../../components/FloatingActionButton';
import CreateMsgIcon from '../../assets/icons/CreateMsgIcon';
import LogoTextLinks from '../../components/LogoTextLinks';
import BaseMembersList from './components/BaseMembersList';
import { BaseEntitiesPropType, UserEntitiesPropType } from '../../utils/types';

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
});

const CategoryDivider = ({ category, onPress }) => (
  <View style={styles.categoryContainer}>
    <Text style={styles.categoryText}>{category}</Text>
    <TouchableOpacity
      onPress={onPress}
    >
      <AntDesign name='plus' size={20} color={colors.white} />
    </TouchableOpacity>
  </View>
);

export default function BaseScreen({ currentBaseId, baseEntities, userEntities, goToChat }) {
  const navigation = useNavigation();
  const base = baseEntities[currentBaseId];
  const mockChannels = [
    {
      text: 'General',
      onPress: () => goToChat(),
    },
    {
      text: 'random',
      onPress: () => goToChat(),
    },
    {
      text: 'Sphere Cube',
      onPress: () => goToChat(),
    },
    {
      text: 'BayBo',
      onPress: () => goToChat(),
    },
  ];

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
      <CategoryDivider
        category="Channels"
        onPress={() => navigation.navigate('ChatActions')}
      />
      <LogoTextLinks
        buttons={mockChannels}
        textStyle={sharedStyles.textLightGray16}
        icon={<Feather style={styles.icon} name='hash' size={18} color={colors.white} />}
      />
      <CategoryDivider
        category="Direct Messages"
        onPress={() => navigation.navigate('ChatActions')}
      />
      <BaseMembersList
        memberIds={base.members}
        userEntities={userEntities}
        goToChat={goToChat}
      />
      <FloatingActionButton
        icon={<CreateMsgIcon height={20} />}
        onPress={() => navigation.navigate('ChatActions')}
      />
    </BaseBottomTabNavigatorLayout>
  );
}

BaseScreen.propTypes = {
  goToChat: PropTypes.func,
  currentBaseId: PropTypes.string,
  baseEntities: BaseEntitiesPropType,
  userEntities: UserEntitiesPropType,
};

CategoryDivider.propTypes = {
  onPress: PropTypes.func,
  category: PropTypes.string,
};
