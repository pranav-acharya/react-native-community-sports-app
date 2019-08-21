import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ButtonGroup, Button } from 'react-native-elements';
import { getUserId } from '../utils/appContext';
import { getUserProfile, createUserProfile } from '../api/services';
import { formButtonStyle, errorStyle } from '../utils/styles';
import FormInput from '../components/commons/FormInput';
import { getAxiosErrorMessage } from '../utils/helpers';
import LoadingIndicator from '../components/commons/LoadingIndicator';

class NewProfileScreen extends Component {
  state = {
    name: '',
    error: null,
    busy: true,
    isParent: true,
  }

  componentWillMount = () => {
    getUserProfile(getUserId())
      .then((profile) => {
        this.setState({ busy: false });
        if (profile) {
          const navigationScreen = profile.parent ? 'Parent' : 'Coach';
          this.props.navigation.navigate(navigationScreen);
        }
      });
  }

  createProfile = () => {
    const { name, isParent } = this.state.fields;
    this.setState({ busy: true });
    createUserProfile({
      userId: getUserId,
      name,
      isParent,
    }).then((profile) => {
      this.setState({ busy: false });
      const navigationScreen = profile.parent ? 'Parent' : 'Coach';
      this.props.navigation.navigate(navigationScreen);
    }).catch((err) => {
      this.setState({ error: getAxiosErrorMessage(err), busy: false });
    });
  }

  render() {
    // TODO: Load more fields for a coach
    const { name, error, busy, isParent } = this.state;
    const buttonParent = <Button style={formButtonStyle} title="I'm a parent" />;
    const buttonCoach = <Button style={formButtonStyle} title="I'm a coach" />;
    if (busy) { return <LoadingIndicator />; }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FormInput
          name="name"
          placeholder="Name"
          iconName="md-mail"
          autoCompleteType="off"
          keyboardType="text"
          value={name}
          errorStyle={errorStyle}
          onChangeText={text => this.setState({ name: text })}
        />
        <ButtonGroup
          onPress={() => this.setState({ isParent: !isParent })}
          selectedIndex={isParent ? 0 : 1}
          buttons={['Im a parent', 'Im a coach']}
          containerStyle={{ height: 100 }}
        />
        <Text style={errorStyle}>{error}</Text>
        <Button style={formButtonStyle} title="Continue" onPress={this.createProfile} />

      </View>
    );
  }
}


export default NewProfileScreen;
