import React, { Component } from 'react';
import { AppState, AsyncStorage } from 'react-native';
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

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    console.log('state', nextAppState);
    // if (
    //   this.state.appState.match(/inactive|background/)
    //   && nextAppState === 'active'
    // ) {
    //   console.log('App has come to the foreground!');
    // }
    // this.setState({ appState: nextAppState });
  }


  render() {
    const { token } = this.state;
    if (token == null) { return <LoadingIndicator />; }

    return <WelcomeComponent />;
  }
}

export default WelcomeScreen;
