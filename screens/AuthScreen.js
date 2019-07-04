import { createStackNavigator } from 'react-navigation';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

const AuthScreen = createStackNavigator({
  Signup: {
    screen: Signup,
    navigationOptions: (/* { navigation } */) => ({
      title: 'Signup',
    }),
  },
  Login: {
    screen: Login,
    navigationOptions: (/* { navigation } */) => ({
      title: 'Login',
    }),
  }
});

export default AuthScreen;
