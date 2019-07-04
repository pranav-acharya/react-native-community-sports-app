import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

const logo = require('../assets/snack-icon.png');

class WelcomeComponent extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={logo} />
        <Text>This is a welcome testingscreen</Text>
      </View>
    );
  }
}

export default WelcomeComponent;
