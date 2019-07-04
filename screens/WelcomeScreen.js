import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import WelcomeComponent from '../components/WelcomeComponent';
import LoadingIndicator from '../components/commons/LoadingIndicator';

class WelcomeScreen extends Component {
  state = { token: null }

  async componentWillMount() {
    // get the token storage value
    const token = await AsyncStorage.getItem('token');
    // if null, continue
    if (token) {
      this.setState({ token });
      this.props.navigation.navigate('Connected');
    } else {
      this.setState({ token: false });
    }
    // else navigate to auth
  }

  render() {
    const { token } = this.state;
    if (token == null) { return <LoadingIndicator />; }

    return <WelcomeComponent />;
  }
}

export default WelcomeScreen;
