import { AppLoading } from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { withAuthenticator } from 'aws-amplify-react-native';
import { PersistGate } from 'redux-persist/integration/react';

import { func } from './constants';
import AlertToast from './components/AlertToast';
import { authStateToActionDict } from './store/app/ducks';
import MainStack from './navigation/MainStack';
import DrawerRight from './components/DrawerRight';
import Locale from './containers/Locale';
import apiService from './services/api/apiService';
import awsService from './services/aws/awsService';
import getStore from './store/store';
import AmplifyTheme from './constants/AmplifyTheme';

awsService.init();
apiService.init();
const { store, persistor } = getStore();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      drawerRightIsOpened: false,
    };

    this.handleRightDrawer = this.handleRightDrawer.bind(this);
  }

  handleRightDrawer(show) {
    this.setState({
      drawerRightIsOpened: show,
    });
  }

  render() {
    const { isLoading, drawerRightIsOpened } = this.state;

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
            <MainStack
              screenProps={{
                drawerIsOpened: false,
                handleRightDrawer: this.handleRightDrawer,
              }}
            />
            <DrawerRight
              handleRightDrawer={this.handleRightDrawer}
              show={drawerRightIsOpened}
            />
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
