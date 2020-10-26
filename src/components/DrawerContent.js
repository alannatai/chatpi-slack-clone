import { View, TouchableOpacity, Text, Image } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import { baseSelectors, baseActions } from '../store/base/ducks';

import gStyle from '../constants/gStyle';
import colors from '../constants/colors';
import sharedStyles from '../constants/sharedStyles';

const styles = {
  drawerContentContainer: {
    backgroundColor: colors.purpleDark,
    flex: 1,
  },
  drawerLinksContainer: {
    backgroundColor: colors.purple,
    flex: 1,
    paddingHorizontal: 16,
  },
  baseLinkContainer: {
    ...gStyle.flexRowCenterAlign,
    marginTop: 16,
  },
  header: {
    paddingVertical: 20,
    marginTop: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 8,
    marginRight: 16,
  },
};

function DrawerContent({ bases, baseEntities, setCurrentBaseId }) {
  return (
    <View style={styles.drawerContentContainer}>
      <View style={styles.header}>
        <Text style={sharedStyles.textWhiteBold20}>Bases</Text>
      </View>
      <View style={styles.drawerLinksContainer}>
        {bases.map((baseId) => {
          const base = baseEntities[baseId];

          return (
            <TouchableOpacity
              key={baseId}
              style={styles.baseLinkContainer}
              onPress={() => {
                setCurrentBaseId({ currentBaseId: baseId });
              }}
            >
              <Image source={{ uri: base.imageUrl }} style={styles.image} />
              <Text style={sharedStyles.textWhite20}>{base.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({
  bases: baseSelectors.bases(state),
  baseEntities: baseSelectors.baseEntities(state),
});

const mapDispatchToProps = {
  setCurrentBaseId: baseActions.setCurrentBaseId,
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
