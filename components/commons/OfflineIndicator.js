import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

class OfflineIndicator extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Looks like you are Offline</Text>
        <Button title="Tap to retry" onPress={this.props.onRetryPress} />
      </View>
    );
  }
}

export default OfflineIndicator;
