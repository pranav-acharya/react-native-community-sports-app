import React, { Component } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { containerStyle } from '../../utils/styles';
import { getAvatarText } from '../../utils/helpers';
import FormInput from '../../components/commons/FormInput';

const SAMPLE_PROFILE = {
  name: 'Mohan Reddy',
  email: 'mohan.reddy@gmail.com',
  contact: '9851441563'
};
class SettingsScreen extends Component {
  state = {
    name: '',
    email: '',
    contact: ''
  }

  componentDidMount() {
    this.loadProfileDetails();
  }

  loadProfileDetails() {
    this.setState(SAMPLE_PROFILE);
  }

  render() {
    return (
      <View style={containerStyle}>
        <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
          <Avatar rounded title={getAvatarText(this.state.name)} size="large" />
        </View>

        <FormInput
          name="name"
          iconName="md-person"
          value={this.state.name}
          disabled
        />

        <FormInput
          name="email"
          iconName="md-mail"
          value={this.state.email}
          disabled
        />

        <FormInput
          name="contact"
          iconName="md-phone-portrait"
          value={this.state.contact}
          disabled
        />

        <FormInput
          iconName="md-finger-print"
          name="password"
          disabled
          value="Change password"
        />
      </View>
    );
  }
}

export default SettingsScreen;
