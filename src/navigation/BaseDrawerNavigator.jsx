import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Base from '../screens/BaseScreen/Base';
import DrawerContent from '../components/DrawerContent';
import device from '../constants/device';
import DirectMessages from '../screens/DirectMessagesScreen/DirectMessages';
import Profile from '../screens/ProfileScreen/Profile';
import Mentions from '../screens/MentionsScreen/Mentions';
import colors from '../constants/colors';
import BottomTabNav from '../components/BottomTabNav';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function BaseBottomNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabNav {...props} />}
      initialRouteName="Base"
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
          tabBarLabel: 'DMs',
          tabBarIcon: ({ color, size }) => (
            <Feather name="message-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Mentions"
        component={Mentions}
        options={{
          tabBarLabel: 'Mentions',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="mention" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'You',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="face" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function BaseDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={() => <DrawerContent />}
      edgeWidth={120}
      drawerType="slide"
      drawerWidth={device.width - 32}
      initialRouteName="MainBaseScreen"
      overlayColor={colors.black50}
      drawerStyle={{
        width: '90%',
      }}
    >
      <Drawer.Screen name="MainBaseScreen" component={BaseBottomNavigator} />
    </Drawer.Navigator>
  );
}
