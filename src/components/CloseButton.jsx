import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { SimpleLineIcons } from '@expo/vector-icons';

export default function CloseButton(props) {
  return (
    <TouchableOpacity
      hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
      onPress={props.onPress}
    >
      <SimpleLineIcons name="close" size={20} color="white" />
    </TouchableOpacity>
  );
}

CloseButton.propTypes = {
  onPress: PropTypes.func,
};
