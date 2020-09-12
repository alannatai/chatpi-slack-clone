import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { Feather, AntDesign } from '@expo/vector-icons';

import Base from '../screens/BaseScreen/Base';
import DrawerContent from '../components/DrawerContent';
import device from '../constants/device';
import DirectMessages from '../screens/DirectMessagesScreen/DirectMessages';
import Profile from '../screens/ProfileScreen/Profile';
import colors from '../constants/colors';

const Drawer = createDrawerNavigator();

function BaseDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      edgeWidth={120}
      drawerType="slide"
      drawerWidth={device.width - 32}
      initialRouteName="MainBaseScreen"
      overlayColor={colors.black50}
      drawerStyle={{
        width: '90%',
      }}
    >
      <Drawer.Screen name="MainBaseScreen" component={Base} />
    </Drawer.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function BaseBottomNavigator() {
  return (
    <Tab.Navigator
      tabBar={() => <></>}
      initialRouteName="Base"
      screenContainerStyle={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,

        elevation: 24,
      }}
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
        component={BaseDrawerNavigator}
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
          cardStyle: {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,

            elevation: 24,
          },
          title: 'Messages',
          sceneContainerStyle: {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,

            elevation: 24,
          },
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
