import { createStackNavigator } from 'react-navigation';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Verify from '../components/auth/Verify';

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
  },
  Verify: {
    screen: Verify,
    navigationOptions: () => ({
      title: 'Verify'
    })
  }
});

export default AuthScreen;
