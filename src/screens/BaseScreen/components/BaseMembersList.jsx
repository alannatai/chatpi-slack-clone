import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import sharedStyles from '../../../constants/sharedStyles';
import { UserEntitiesPropType } from '../../../utils/types';

export default function BaseMembersList({ memberIds, userEntities, goToChat }) {
  return (
    <>
      {memberIds.map(memberId => {
        const member = userEntities[memberId];
        return (
          <TouchableOpacity style={sharedStyles.logoTextLinkContainer} onPress={() => goToChat()} key={member.id}>
            <View style={{ ...sharedStyles.statusOnline, marginLeft: 5, marginRight: 20 }} />
            <Text style={sharedStyles.textLightGray16}>{member.username}</Text>
          </TouchableOpacity>
        );
      })}
    </>
  );
}

BaseMembersList.propTypes = {
  goToChat: PropTypes.func,
  userEntities: UserEntitiesPropType,
  memberIds: PropTypes.arrayOf(PropTypes.string),
};
