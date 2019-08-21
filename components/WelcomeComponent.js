import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { formButtonStyle } from '../utils/styles';

// const logo = require('../assets/snack-icon.png');

class WelcomeComponent extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Image source={logo} /> */}

        <Text style={{ fontSize: 22 }}>
          <Text style={{ fontWeight: 'bold' }}>Urban</Text>
          <Text>Trainer</Text>
        </Text>

        <Button title="Get Started" style={formButtonStyle} />
      </View>
    );
  }
}

export default WelcomeComponent;
