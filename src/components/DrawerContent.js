import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import { baseSelectors } from '../store/base/ducks';

import gStyle from '../constants/gStyle';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  drawerContentContainer: {
    backgroundColor: colors.purpleDark,
    flex: 1,
  },
  drawerLinksContainer: {
    backgroundColor: colors.purple,
    flex: 1,
    paddingHorizontal: 15,
  },
  baseLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  text: {
    ...gStyle.textLarsBold18,
    color: colors.white,
    fontSize: 20,
  },
  header: {
    paddingVertical: 20,
    marginTop: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: '600',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 8,
    marginRight: 15,
  },
});

function DrawerContent({ bases, baseEntities }) {
  console.log('ENTITIES:', baseEntities);
  return (
    <View style={styles.drawerContentContainer}>
      <View style={styles.header}>
        <Text style={{ ...styles.text, ...styles.headerText }}>Bases</Text>
      </View>
      <View style={styles.drawerLinksContainer}>
        {bases.map((baseId) => {
          const base = baseEntities[baseId];

          return (
            <TouchableOpacity key={baseId} style={styles.baseLinkContainer}>
              <Image source={{ uri: base.imageUrl }} style={styles.image} />
              <Text style={styles.text}>{base.name}</Text>
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
