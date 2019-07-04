import React from 'react';
import { View } from 'react-native';
import { containerStyle } from '../../utils/styles';
import NewDrillScreen from './NewDrillScreen';

const DrillsScreen = () => (
  <View style={containerStyle}>
    <NewDrillScreen />
  </View>
);

export default DrillsScreen;
