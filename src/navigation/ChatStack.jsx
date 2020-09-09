import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BaseBottomNavigator from './BaseBottomNavigator';
import { gStyle } from '../constants';
import ModalRoutes from './ModalRoutes';
import Chat from '../screens/ChatScreen/Chat';
import Notifications from '../screens/NotificationsScreen';

// create stack navigator
// const ChatStack = createStackNavigator(
//   {
//     Chat: {
//       screen: Chat,
//       navigationOptions: ({ screenProps }) => ({
//         headerRight: <HeaderRight screenProps={screenProps} />,
//       }),
//     },
//     Notifications,
//     menu: {
//       screen: AppStack,
//       navigationOptions: ({ screenProps }) => ({
//         headerVisible: false,
//         // headerStyle: {
//         //   backgroundColor: colors.purple,
//         //   shadowColor: 'transparent',
//         // },
//         // headerTintColor: colors.white,
//         // headerLeft: <HeaderLeft />,
//         // title: 'Base',
//       }),
//     },
//   },
//   {
//     headerMode: 'none',
//     initialRouteName: 'Base',
//     defaultNavigationOptions: {
//       // headerLeft: <HeaderLeft />,
//       // headerRight: <HeaderRight />,
//       headerTitleStyle: gStyle.textLarsBold16,
//     },
//     transitionConfig: ModalRoutes,
//   },
// );

// export default ChatStack;

const Stack = createStackNavigator();

export default function ChatStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="Base"
      defaultNavigationOptions={{
        // headerLeft: <HeaderLeft />,
        // headerRight: <HeaderRight />,
        headerTitleStyle: gStyle.textLarsBold16,
      }}
      transitionConfig={ModalRoutes}
    >
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen
        name="Notifications"
        title="Base"
        component={Notifications}
      />
      <Stack.Screen name="Base" title="Base" component={BaseBottomNavigator} />
    </Stack.Navigator>
  );
}
