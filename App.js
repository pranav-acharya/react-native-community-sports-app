import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
// ref: https://github.com/StephenGrider/AdvancedReactNative
// You can import from local files
import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import StateConnectedScreen from './screens/StateConnectedScreen';
import AuthScreen from './screens/AuthScreen';

// Parents screen
import ChildrenScreen from './screens/Parent/ChildrenScreen';
import EnrollScreen from './screens/Parent/EnrollScreen';
import FeedScreen from './screens/Parent/FeedScreen';
import SettingsScreen from './screens/Parent/SettingsScreen';

// Coach screen
import ClassesScreen from './screens/Coach/ClassesScreen';
import DrillsScreen from './screens/Coach/DrillsScreen';

const createTabBarIcon = iconName => ({ tintColor }) => (
  <Ionicon name={iconName} color={tintColor} size={30} style={styles.iconStyle} />
);

export default class App extends React.Component {
  render() {
    const ParentScreen = createBottomTabNavigator({
      Settings: {
        screen: SettingsScreen,
        navigationOptions: { tabBarIcon: createTabBarIcon('md-settings') }
      },
      Enroll: {
        screen: EnrollScreen,
        navigationOptions: { tabBarIcon: createTabBarIcon('md-clipboard') }
      },
      Children: {
        screen: ChildrenScreen,
        navigationOptions: { tabBarIcon: createTabBarIcon('md-contacts') }
      },
      Feed: {
        screen: FeedScreen,
        navigationOptions: { tabBarIcon: createTabBarIcon('md-trending-up') }
      },
    });

    const CoachScreen = createBottomTabNavigator({
      Drills: {
        screen: DrillsScreen,
        navigationOptions: { tabBarIcon: createTabBarIcon('md-fitness') }
      },
      Classes: {
        screen: ClassesScreen,
        navigationOptions: { tabBarIcon: createTabBarIcon('md-time') }
      },
      Settings: {
        screen: SettingsScreen,
        navigationOptions: { tabBarIcon: createTabBarIcon('md-settings') }
      },
    });

    const MainNavigator = createBottomTabNavigator({
      Coach: CoachScreen,
      Parent: ParentScreen,
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
        <ThemeProvider>
          <AppContainer />
        </ThemeProvider>
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  iconStyle: {
    width: 100,
    textAlign: 'center'
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   paddingTop: Constants.statusBarHeight,
  //   backgroundColor: '#ecf0f1',
  //   padding: 8,
  // },
  // paragraph: {
  //   margin: 24,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
});
