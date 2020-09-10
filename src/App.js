import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { withAuthenticator } from 'aws-amplify-react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { enableScreens } from 'react-native-screens';

import ChatStack from './navigation/ChatStack';
import { func } from './constants';
import AlertToast from './components/AlertToast';
import { authStateToActionDict } from './store/app/ducks';
import Locale from './containers/Locale';
import apiService from './services/api/apiService';
import awsService from './services/aws/awsService';
import getStore from './store/store';
import AmplifyTheme from './constants/AmplifyTheme';

enableScreens();

awsService.init();
apiService.init();

const { store, persistor } = getStore();

const defaultTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(255, 255, 255)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <AppLoading
          onFinish={() => this.setState({ isLoading: false })}
          startAsync={func.loadAssetsAsync}
        />
      );
    }

    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Locale />
            <NavigationContainer theme={defaultTheme}>
              <ChatStack />
            </NavigationContainer>
            <AlertToast />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App, {
  includeGreetings: false,
  theme: { myTheme: AmplifyTheme },
  handleAuthStateChange: (authState) => {
    if (authStateToActionDict[authState]) {
      store.dispatch(authStateToActionDict[authState]);
      // store.replaceReducer();
    }
  },
});
