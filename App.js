import * as React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
// ref: https://github.com/StephenGrider/AdvancedReactNative

import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import StateConnectedScreen from './screens/StateConnectedScreen';
import AuthScreen from './screens/AuthScreen';


// eslint-disable-next-line react/prefer-stateless-function
export default class App extends React.Component {
  render() {
    const MainNavigator = createBottomTabNavigator({
      Welcome: WelcomeScreen,
      Auth: AuthScreen,
      Connected: StateConnectedScreen
    }, {
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    });

    const AppContainer = createAppContainer(MainNavigator);

    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });
