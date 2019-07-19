import React from 'react';
import { View, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { CheckBox, Button, Avatar } from 'react-native-elements';

import { containerStyle } from '../../utils/styles';
import FormInput from '../../components/commons/FormInput';

const ChildrenScreen = () => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView behavior="padding" enabled style={containerStyle}>
      <View style={{ width: 250, alignItems: 'center' }}>
        <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
          <Avatar rounded size="large" />
        </View>
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
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
);


export default ChildrenScreen;
