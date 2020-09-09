import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Feather, AntDesign } from '@expo/vector-icons';

import DirectMessages from '../screens/DirectMessagesScreen/DirectMessages';
import Profile from '../screens/ProfileScreen/Profile';
import colors from '../constants/colors';
import Base from '../screens/BaseScreen/Base';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Base"
      tabBarOptions={{
        tabStyle: {
          paddingTop: 10,
        },
        style: {
          backgroundColor: colors.black85,
          borderTopWidth: 1,
          borderTopColor: colors.black20,
        },
        activeTintColor: colors.white,
      }}
    >
      <Tab.Screen
        name="Base"
        component={Base}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DirectMessages"
        component={DirectMessages}
        options={{
          title: 'Messages',
          tabBarLabel: 'DMs',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="message1" size={size} color={color} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'You',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="profile" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
