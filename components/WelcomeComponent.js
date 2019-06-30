import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

class WelcomeComponent extends Component {

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../assets/snack-icon.png')} />
        <Text>This is a welcome screen</Text>
      </View>
    );
  }
}

export default WelcomeComponent;