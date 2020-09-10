import { View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ChatActions from '../screens/ChatActionsScreen/ChatActions';
import HeaderRight from '../components/HeaderRight';
import { baseSelectors } from '../store/base/ducks';
import BaseBottomNavigator from './BaseBottomNavigator';
import ModalRoutes from './ModalRoutes';
import Chat from '../screens/ChatScreen/Chat';
import Notifications from '../screens/NotificationsScreen';

const Stack = createNativeStackNavigator();

export default function ChatStack({ navigation }) {
  console.log(navigation);
  const baseName = useSelector(baseSelectors.currentBaseName);

  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="Base"
      screenOptions={{
        headerBackTitleVisible: false,
      }}
      transitionConfig={ModalRoutes}
    >
      <Stack.Screen
        name="Chat"
        options={({ navigation }) => ({
          title: baseName,
          headerRight: () => (
            <View style={{ marginRight: -25 }}>
              <HeaderRight navigation={navigation} />
            </View>
          ),
        })}
        component={Chat}
      />
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
        name="Base"
        title="Base"
        component={BaseBottomNavigator}
        options={{ title: 'Base', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
