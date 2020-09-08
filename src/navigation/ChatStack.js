import React from 'react';
import { createStackNavigator } from 'react-navigation';

import colors from '../constants/colors';
import Base from '../screens/BaseScreen/Base';
import HeaderLeft from '../components/HeaderLeft';
import HeaderRight from '../components/HeaderRight';
import { gStyle } from '../constants';
import ModalRoutes from './ModalRoutes';
import Chat from '../screens/ChatScreen/Chat';
import Notifications from '../screens/NotificationsScreen';

// create stack navigator
const ChatStack = createStackNavigator(
  {
    Chat: {
      screen: Chat,
      navigationOptions: ({ screenProps }) => ({
        headerRight: <HeaderRight screenProps={screenProps} />,
      }),
    },
    Notifications,
    Base: {
      screen: Base,
      navigationOptions: ({ screenProps }) => ({
        headerVisible: false,
        // headerStyle: {
        //   backgroundColor: colors.purple,
        //   shadowColor: 'transparent',
        // },
        // headerTintColor: colors.white,
        // headerLeft: <HeaderLeft />,
        // title: 'Base',
      }),
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Base',
    defaultNavigationOptions: {
      // headerLeft: <HeaderLeft />,
      // headerRight: <HeaderRight />,
      headerTitleStyle: gStyle.textLarsBold16,
    },
    transitionConfig: ModalRoutes,
  },
);

export default ChatStack;
