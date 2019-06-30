import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, ThemeProvider, Input, Text } from 'react-native-elements';

import { emailRegex, phoneNumberRegex } from '../../utils/helpers';
import { errorStyle, containerStyle } from '../../utils/styles';
import { signupPress } from '../../actions/auth_actions';

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
    if (!errorExists) {
      this.props.signupPress(values);
    }
  };

  handleChange = fieldName => (text) => {
    const { fields } = this.state;
    fields[fieldName] = text;
    this.setState({ fields });
  };

  onLoginPress = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    const { loading } = this.props.signup;
    return (
      <View style={containerStyle}>
        <View style={{ width: 300 }}>
          <ThemeProvider>
            <Input
              name="email"
              placeholder="Email (john@gmail.com)"
              autoCapitalize="none"
              autoCompleteType="off"
              keyboardType="email-address"
              value={this.state.fields.email}
              errorStyle={errorStyle}
              errorMessage={this.state.errors.email}
              onChangeText={this.handleChange('email')}
            />

            <Input
              name="contact"
              placeholder="10 digit contact (9665234532)"
              autoCapitalize="none"
              autoCompleteType="off"
              keyboardType="phone-pad"
              value={this.state.fields.contact}
              errorStyle={errorStyle}
              errorMessage={this.state.errors.contact}
              onChangeText={this.handleChange('contact')}
            />

            <Input
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

            <Text
              visible={this.props.signup.status === false}
              style={{ ...errorStyle, textAlign: 'center', width: '100%', marginTop: 20 }}
            >
              {this.props.signup.error}
            </Text>

            <Button
              title="Signup"
              onPress={this.submit}
              style={styles.authButton}
              loading={loading}
              disabled={loading}
            />
            <Text style={{ textAlign: 'center' }}>OR</Text>
            <Button
              title="Login here"
              style={styles.authButton}
              onPress={this.onLoginPress}
            />
          </ThemeProvider>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  authButton: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
});

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
    : values.contact.length !== 10 || !phoneNumberRegex.test(values.email)
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
