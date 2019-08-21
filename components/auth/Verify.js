import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, ThemeProvider, Text } from 'react-native-elements';

import { errorStyle, formButtonStyle } from '../../utils/styles';
import { verifyPress } from '../../actions/auth_actions';
import FormInput from '../commons/FormInput';

class VerifyForm extends Component {
  state = {
    code: '',
    error: null
  };

  submit = () => {
    const { code } = this.state;
    if (!code) { this.setState({ error: 'Code cannot be blank' }); } else { this.props.verifyPress(code); }
  };

  componentWillReceiveProps = (nextProps) => {
    // navigate to login screen on successful verification
    if (nextProps.verify.status) { this.props.navigation.navigate('Login'); }
  }

  render() {
    const { loading } = this.props.verify;
    const { error, code } = this.state;
    return (
      <View style={styles.loginContainerStyle}>
        <View style={{ width: 300 }}>
          <ThemeProvider>
            <FormInput
              name="code"
              placeholder="Verification code"
              iconName="md-mail"
              autoCapitalize="none"
              autoCompleteType="off"
              value={code}
              errorStyle={errorStyle}
              errorMessage={error}
              onChangeText={text => this.setState({ code: text })}
            />
            <Text visible={this.props.verify.status === false} style={{ ...errorStyle, textAlign: 'center', width: '100%', marginTop: 20 }}>
              {this.props.verify.error}
            </Text>

            <Button
              onPress={this.submit}
              title="Verify"
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

const mapStateToProps = state => ({
  verify: state.auth.verify
});
export default connect(
  mapStateToProps,
  { verifyPress }
)(VerifyForm);
