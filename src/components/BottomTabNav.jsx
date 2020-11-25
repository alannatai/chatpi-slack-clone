import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import colors from '../constants/colors';

export default function BottomTabNav({ state, descriptors, navigation }) {
  return (
    <View style={styles.navContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel;
        const Icon = options.tabBarIcon;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        return (
          <TouchableOpacity
            key={label}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.buttonContainer}
          >
            <Icon color={isFocused ? colors.white : colors.gray} size={24} />
            <Text style={{ color: isFocused ? colors.white : colors.gray, ...styles.buttonText }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = {
  navContainer: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    backgroundColor: colors.black85,
    borderTopColor: colors.darkGray4,
    borderTopWidth: 1,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonText: {
    marginTop: 4,
    fontSize: 12,
  },
};
