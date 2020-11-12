import { View, TouchableOpacity, Text, Image } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import { baseSelectors, baseActions } from '../store/base/ducks';

import gStyle from '../constants/gStyle';
import colors from '../constants/colors';
import sharedStyles from '../constants/sharedStyles';

const styles = {
  drawerContainer: {
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: 'row',
  },
  drawerNavContainer: {
    backgroundColor: colors.lightGray,
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
    borderColor: '#555',
    borderWidth: 3,
    borderRadius: 12,
  },
  selectedBaseSettingsContainer: {
    flex: 1,
    paddingTop: '40%',
  },
  settingsSection: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  }
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
              <Text style={sharedStyles.text12}>{base.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.selectedBaseSettingsContainer}>
        <View style={styles.settingsSection}>
          <Text style={{ ...sharedStyles.textBold20, marginBottom: 3 }}>{selectedBase.name}</Text>
          <Text style={{ ...sharedStyles.textGray, marginBottom: 20 }}>{selectedBase.name}.slack.com</Text>
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
