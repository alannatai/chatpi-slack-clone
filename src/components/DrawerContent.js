import { View, TouchableOpacity, Text, Image } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import { Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import { baseSelectors, baseActions } from '../store/base/ducks';

import colors from '../constants/colors';
import sharedStyles from '../constants/sharedStyles';
import LogoTextLinks from './LogoTextLinks';

const styles = {
  drawerContainer: {
    backgroundColor: colors.black85,
    flex: 1,
    flexDirection: 'row',
  },
  drawerNavContainer: {
    backgroundColor: colors.gray3,
    paddingTop: '40%',
  },
  baseLinkContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  baseImageContainer: {
    marginBottom: 3,
    height: 72,
    width: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 8,
  },
  selectedImageBorder: {
    borderColor: colors.gray9,
    borderWidth: 3,
    borderRadius: 12,
  },
  selectedBaseSettingsContainer: {
    flex: 1,
    paddingTop: '40%',
  },
};

function DrawerContent({ bases, baseEntities, changeCurrentBase, currentBaseId }) { 
  const selectedBase = baseEntities[currentBaseId];
  const mockDrawerButtons = [
    {
      text: 'Channel browser',
      icon: <Feather name='hash' size={18} color={colors.white} />,
    },
    {
      text: 'People',
      icon: <AntDesign name='contacts' size={18} color={colors.white} />,
    },
    {
      text: 'Files',
      icon: <FontAwesome name='files-o' size={18} color={colors.white} />,
    },
    {
      text: 'Invite people',
      icon: <AntDesign name='adduser' size={18} color={colors.white} />,
    },
    {
      text: 'Help',
      icon: <AntDesign name='questioncircleo' size={18} color={colors.white} />,
    },
    {
      text: 'Preferences',
      icon: <Feather name='settings' size={18} color={colors.white} />,
    },
    {
      text: `Sign out of ${selectedBase.name}`,
      icon: <Feather name='log-out' size={18} color={colors.white} />,
    },
  ];

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerNavContainer}>
        {bases.map((baseId) => {
          const base = baseEntities[baseId];

          return (
            <TouchableOpacity
              key={baseId}
              style={styles.baseLinkContainer}
              onPress={() => {
                changeCurrentBase({ currentBaseId: baseId });
              }}
            >
              <View style={[styles.baseImageContainer, selectedBase === base ? styles.selectedImageBorder : null]}>
                <Image source={{ uri: base.imageUrl }} style={styles.image} />
              </View>
              <Text style={sharedStyles.textLightGray12}>{base.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.selectedBaseSettingsContainer}>
        <View style={{ ...sharedStyles.borderBottomGray, paddingVertical: 0, paddingHorizontal: 20 }}>
          <Text style={{ ...sharedStyles.textWhiteBold20, marginBottom: 3, marginTop: 20 }}>{selectedBase.name}</Text>
          <Text style={{ ...sharedStyles.textGray, marginBottom: 20 }}>{selectedBase.name}.touchbase.com</Text>
        </View>
        <LogoTextLinks
          paddingHorizontal
          paddingVertical
          buttons={mockDrawerButtons.slice(0, 3)}
          textStyle={sharedStyles.textLightGray14}
          divider
        />
        <LogoTextLinks
          paddingHorizontal
          paddingVertical
          buttons={mockDrawerButtons.slice(3, 5)}
          textStyle={sharedStyles.textLightGray14}
          divider
        />
        <LogoTextLinks
          paddingHorizontal
          paddingVertical
          buttons={mockDrawerButtons.slice(5, 7)}
          textStyle={sharedStyles.textLightGray14}
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({
  bases: baseSelectors.bases(state),
  baseEntities: baseSelectors.baseEntities(state),
  currentBaseId: baseSelectors.currentBaseId(state),
});

const mapDispatchToProps = {
  changeCurrentBase: baseActions.changeCurrentBase,
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
