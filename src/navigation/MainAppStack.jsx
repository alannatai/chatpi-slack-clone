import React from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import BaseChatSwipeNavigator from './BaseChatSwipeNavigator';
import ChatActions from '../screens/ChatActionsScreen/ChatActions';
import { baseSelectors } from '../store/base/ducks';
import ModalRoutes from './ModalRoutes';
import Notifications from '../screens/NotificationsScreen';

const Stack = createNativeStackNavigator();

export default function MainAppStack() {
  const baseName = useSelector(baseSelectors.currentBaseName);

  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="Home"
      screenOptions={{
        headerBackTitleVisible: false,
      }}
      transitionConfig={ModalRoutes}
    >
      <Stack.Screen
        name="ChatActions"
        title="ChatActions"
        component={ChatActions}
        options={{ stackPresentation: 'modal' }}
      />
      <Stack.Screen
        name="Notifications"
        title="Notifications"
        component={Notifications}
      />
      <Stack.Screen
        name="Home"
        title="Home"
        component={BaseChatSwipeNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
