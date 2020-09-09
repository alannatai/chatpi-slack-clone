import { Auth } from 'aws-amplify';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// import ModalRoutes from './ModalRoutes';

// screens

// components

// create stack navigator
// const AuthStack = createStackNavigator(
//   {
//     Auth: {
//       screen: Auth,
//       navigationOptions: ({ screenProps }) => ({
//         headerRight: <HeaderRight screenProps={screenProps} />,
//       }),
//     },
//     Notifications,
//   },
//   {
//     initialRouteName: 'Auth',
//     defaultNavigationOptions: {
//       headerLeft: <HeaderLeft />,
//       headerRight: <HeaderRight />,
//       headerTitleStyle: gStyle.textLarsBold16,
//     },
//     transitionConfig: ModalRoutes,
//   },
// );

// export default AuthStack;

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen name="Auth" component={Auth} />
    </Stack.Navigator>
  );
}
