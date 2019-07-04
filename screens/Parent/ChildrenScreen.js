import React from 'react';
import { View } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';


import { containerStyle } from '../../utils/styles';
import FormInput from '../../components/commons/FormInput';

const ChildrenScreen = () => (
  <View style={containerStyle}>
    <View style={{ width: 250, alignItems: 'center' }}>

      <FormInput placeholder="Full name" iconName="md-person" />
      <FormInput placeholder="Age" iconName="md-time" keyboardType="numeric" />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CheckBox
          title="Male"
          containerStyle={{ width: '50%', marginRight: 0, marginLeft: 0 }}
        />
        <CheckBox
          title="Female"
          containerStyle={{ width: '50%', marginRight: 0, marginLeft: 0 }}
          checked
        />
      </View>
      <Button title="Register Child" buttonStyle={{ borderRadius: '50%', width: 200, marginTop: 20 }} />
    </View>
  </View>
);


export default ChildrenScreen;
