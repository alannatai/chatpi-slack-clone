import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import ChatStack from './ChatStack';

// const defaultGetStateForAction = DrawerNavigator.router.getStateForAction;

// DrawerNavigator.router.getStateForAction = (action, state) => {
//   if (action.type === 'Navigation/MARK_DRAWER_SETTLING') {
//     if (action.willShow === false) {
//       StatusBar.setBarStyle('dark-content');
//     } else if (action.willShow === true) {
//       StatusBar.setBarStyle('light-content');
//     }
//   }

//   return defaultGetStateForAction(action, state);
// };

//

// const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer theme={defaultTheme}>
      {/* <Drawer.Navigator */}
      {/*   n */}
      {/*   contentComponent={DrawerContent} */}
      {/*   drawerType="slide" */}
      {/*   drawerWidth={device.width - 32} */}
      {/*   initialRouteName="ChatStack" */}
      {/*   overlayColor={colors.black50} */}
      {/* > */}
      {/*   <Drawer.Screen name="ChatStack" component={() => <View />} /> */}
      {/* </Drawer.Navigator> */}
      <ChatStack />
    </NavigationContainer>
  );
}
