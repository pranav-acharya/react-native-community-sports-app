import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Button, ThemeProvider, Text } from 'react-native-elements';

import { emailRegex } from '../../utils/helpers';
import { errorStyle, formButtonStyle } from '../../utils/styles';
import { signupPress } from '../../actions/auth_actions';
import FormInput from '../commons/FormInput';

class Signup extends Component {
  state = {
    fields: {
      email: '',
      contact: '',
      password: ''
    },
    errors: {},
  };

  submit = () => {
    const values = this.state.fields;
    const errors = validate(values);
    const errorExists = Object.values(errors).some(
      errorVal => errorVal !== undefined
    );

    this.setState({ errors });
    if (!errorExists) { this.props.signupPress(values); }
  };

  handleChange = fieldName => (text) => {
    const { fields } = this.state;
    fields[fieldName] = text;
    this.setState({ fields });
  };

  onLoginPress = () => {
    this.props.navigation.navigate('Login');
  };

  onVerifyPress = () => {
    this.props.navigation.navigate('Verify');
  }

  componentWillReceiveProps = (nextProps) => {
    // navigate to verify screen on successful signup
    if (nextProps.signup.status) { this.onVerifyPress(); }
  }

  render() {
    const { loading } = this.props.signup;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: 300 }}>
          <ThemeProvider>
            <FormInput
              name="email"
              iconName="md-mail"
              placeholder="Email (john@gmail.com)"
              autoCapitalize="none"
              autoCompleteType="off"
              keyboardType="email-address"
              value={this.state.fields.email}
              errorStyle={errorStyle}
              errorMessage={this.state.errors.email}
              onChangeText={this.handleChange('email')}
            />

            <FormInput
              name="contact"
              iconName="md-phone-portrait"
              placeholder="10 digit contact (9665234532)"
              autoCapitalize="none"
              autoCompleteType="off"
              keyboardType="phone-pad"
              value={this.state.fields.contact}
              errorStyle={errorStyle}
              errorMessage={this.state.errors.contact}
              onChangeText={this.handleChange('contact')}
            />

            <FormInput
              iconName="md-finger-print"
              name="password"
              placeholder="Password"
              autoCapitalize="none"
              autoCompleteType="off"
              secureTextEntry
              errorStyle={errorStyle}
              errorMessage={this.state.errors.password}
              value={this.state.fields.password}
              onChangeText={this.handleChange('password')}
            />

            <Text visible={this.props.signup.status === false} style={{ ...errorStyle, textAlign: 'center', width: '100%', marginTop: 20 }}>
              {this.props.signup.error}
            </Text>

            <Button
              title="Signup"
              onPress={this.submit}
              buttonStyle={formButtonStyle}
              loading={loading}
              disabled={loading}
            />
            <Text style={{ textAlign: 'center' }}>OR</Text>
            <Button
              title="Verify"
              buttonStyle={formButtonStyle}
              onPress={this.onVerifyPress}
            />
            <Text style={{ textAlign: 'center' }}>OR</Text>
            <Button
              title="Login here"
              buttonStyle={formButtonStyle}
              onPress={this.onLoginPress}
            />
          </ThemeProvider>
        </View>
      </View>
    );
  }
}

const validate = (values) => {
  const errors = {};
  errors.email = !values.email
    ? 'Email field is required'
    : !emailRegex.test(values.email)
      ? 'Email format is invalid'
      : undefined;

  errors.password = !values.password
    ? 'Password field is required'
    : values.password.length < 8
      ? 'Password must be at least 8 characters long'
      : undefined;

  errors.contact = !values.contact
    ? 'Contact field is required'
    : values.contact.length !== 10 || isNaN(values.contact)
      ? 'Contact must be 10 digits'
      : undefined;

  return errors;
};

const mapStateToProps = state => ({
  signup: state.auth.signup
});

export default connect(mapStateToProps, {
  signupPress
})(Signup);
