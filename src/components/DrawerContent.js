import { StyleSheet, View } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import { baseSelectors } from '../store/base/ducks';

import gStyle from '../constants/gStyle';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  drawerContentContainer: {
    alignItems: 'center',
    backgroundColor: colors.purple,
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    ...gStyle.textLarsBold18,
    color: colors.white,
  },
});

function DrawerContent(props) {
  return <View style={styles.drawerContentContainer}></View>;
}

const mapStateToProps = (state) => (
  {
    bases: baseSelectors.bases(state),
    baseEntities: baseSelectors.baseEntities(state),
  }
);

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerContent);
