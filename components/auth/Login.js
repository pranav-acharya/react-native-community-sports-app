import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, ThemeProvider, Text } from 'react-native-elements';

import { emailRegex } from '../../utils/helpers';
import { errorStyle, formButtonStyle } from '../../utils/styles';
import { loginPress } from '../../actions/auth_actions';
import FormInput from '../commons/FormInput';

class LoginForm extends Component {
  state = {
    fields: {
      email: 'test@gmail.com',
      password: 'test12345'
    },
    errors: {}
  };

  submit = () => {
    const values = this.state.fields;
    const errors = validate(values);
    const errorExists = Object.values(errors).some(
      errorVal => errorVal !== undefined
    );

    this.setState({ errors });
    if (!errorExists) { this.props.loginPress(values); }
  };

  handleChange = fieldName => (text) => {
    const { fields } = this.state;
    fields[fieldName] = text;
    this.setState({ fields });
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps);
    // since there is no valid endpoint, use failure case to navigate
    if (nextProps.login.status === false) { this.props.navigation.navigate('Connected'); }
  }

  render() {
    const { loading } = this.props.login;
    return (
      <View style={styles.loginContainerStyle}>
        <View style={{ width: 300 }}>
          <ThemeProvider>
            <FormInput
              name="email"
              placeholder="Email"
              iconName="md-mail"
              autoCapitalize="none"
              autoCompleteType="off"
              keyboardType="email-address"
              value={this.state.fields.email}
              errorStyle={errorStyle}
              errorMessage={this.state.errors.email}
              onChangeText={this.handleChange('email')}
            />

            <FormInput
              name="password"
              iconName="md-finger-print"
              placeholder="Password"
              autoCapitalize="none"
              autoCompleteType="off"
              secureTextEntry
              errorStyle={errorStyle}
              errorMessage={this.state.errors.password}
              value={this.state.fields.password}
              onChangeText={this.handleChange('password')}
            />

            <Text visible={this.props.login.status === false} style={{ ...errorStyle, textAlign: 'center', width: '100%', marginTop: 20 }}>
              {this.props.login.error}
            </Text>

            <Button
              onPress={this.submit}
              title="Login"
              loading={loading}
              disabled={loading}
              buttonStyle={formButtonStyle}
            />
          </ThemeProvider>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

  return errors;
};

const mapStateToProps = state => ({
  login: state.auth.login
});
export default connect(
  mapStateToProps,
  { loginPress }
)(LoginForm);
