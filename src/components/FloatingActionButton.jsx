import React from 'react';
import { FloatingAction } from 'react-native-floating-action';
import colors from '../constants/colors';

function FloatingActionButton({ onPress, icon }) {
  return (
    <FloatingAction
      showBackground={false}
      onPressMain={onPress}
      color={colors.gray9}
      floatingIcon={icon}
      distanceToEdge={15}
      listenKeyboard
      dismissKeyboardOnPress
    />
  );
};

export default FloatingActionButton;
