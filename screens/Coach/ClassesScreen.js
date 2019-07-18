import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { containerStyle } from '../../utils/styles';


class ClassesScreen extends Component {
  state = {}

  render() {
    return (
      <View style={containerStyle}>
        <Button title="Create Batch" onPress={() => this.props.navigation.navigate('NewBatch')} />
      </View>
    );
  }
}

export default ClassesScreen;
