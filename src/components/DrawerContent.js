import { View, TouchableOpacity, Text, Image } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import { Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import { baseSelectors, baseActions } from '../store/base/ducks';

import colors from '../constants/colors';
import sharedStyles from '../constants/sharedStyles';
import LogoTextLinkItem from './LogoTextLinkItem';

const mockDrawerButtons = [
  {
    name: 'Channel browser',
    icon: <Feather name='hash' size={18} color={colors.white} />,
  },
  {
    name: 'People',
    icon: <AntDesign name='contacts' size={18} color={colors.white} />,
  },
  {
    name: 'Files',
    icon: <FontAwesome name='files-o' size={18} color={colors.white} />,
  },
  {
    name: 'Invite people',
    icon: <AntDesign name='adduser' size={18} color={colors.white} />,
  },
  {
    name: 'Help',
    icon: <AntDesign name='questioncircleo' size={18} color={colors.white} />,
  },
  {
    name: 'Preferences',
    icon: <Feather name='settings' size={18} color={colors.white} />,
  },
  {
    name: 'Sign out of ',
    icon: <Feather name='log-out' size={18} color={colors.white} />,
  },
];

const styles = {
  drawerContainer: {
    backgroundColor: colors.black85,
    flex: 1,
    flexDirection: 'row',
  },
  drawerNavContainer: {
    backgroundColor: colors.darkGray3,
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
    borderColor: colors.gray,
    borderWidth: 3,
    borderRadius: 12,
  },
  selectedBaseSettingsContainer: {
    flex: 1,
    paddingTop: '40%',
  },
  settingsSection: {
    borderBottomColor: colors.darkGray4,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
};

function DrawerContent({ bases, baseEntities, changeCurrentBase, currentBaseId }) { 
  const selectedBase = baseEntities[currentBaseId];
  
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
        <View style={{ ...styles.settingsSection, paddingVertical: 0 }}>
          <Text style={{ ...sharedStyles.textWhiteBold20, marginBottom: 3, marginTop: 20 }}>{selectedBase.name}</Text>
          <Text style={{ ...sharedStyles.textGray, marginBottom: 20 }}>{selectedBase.name}.touchbase.com</Text>
        </View>
        <View style={styles.settingsSection}>
          {mockDrawerButtons.slice(0, 3).map(button => (
            <LogoTextLinkItem
              key={button.name}
              icon={button.icon}
              text={button.name}
              textStyle={sharedStyles.textLightGray14}
            />
          ))}
        </View>
        <View style={styles.settingsSection}>
          {mockDrawerButtons.slice(3, 5).map(button => (
            <LogoTextLinkItem
              key={button.name}
              icon={button.icon}
              text={button.name}
              textStyle={sharedStyles.textLightGray14}
            />
          ))}
        </View>
        <View style={{ ...styles.settingsSection, borderBottomWidth: 0 }}>
          {mockDrawerButtons.slice(5, 6).map(button => (
            <LogoTextLinkItem
              key={button.name}
              icon={button.icon}
              text={button.name}
              textStyle={sharedStyles.textLightGray14}
            />
          ))}
          <LogoTextLinkItem
            icon={<Feather name='log-out' size={18} color={colors.white} />}
            text={`Sign out of ${selectedBase.name}`}
            textStyle={sharedStyles.textLightGray14}
          />
        </View>
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
