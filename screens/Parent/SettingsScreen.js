import React, { Component } from 'react';
import { View, NetInfo } from 'react-native';
import { Avatar, Button, Text } from 'react-native-elements';
import { containerStyle, errorStyle } from '../../utils/styles';
import { getAvatarText, getAxiosErrorMessage } from '../../utils/helpers';
import FormInput from '../../components/commons/FormInput';
import LoadingIndicator from '../../components/commons/LoadingIndicator';
import OfflineIndicator from '../../components/commons/OfflineIndicator';
import { getCurrentUserProfile, updateUserProfile } from '../../api/services';

class SettingsScreen extends Component {
  state = {
    loading: true,
    isConnected: true,
    editMode: false,
    editedProfile: null,
    profile: {
      name: '',
      email: '',
      mobile: '',
    },
    errorMessage: null,
    processing: false
  }

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
      NetInfo.isConnected.fetch().then((isConnected) => {
        this.setState({ isConnected });
        if (isConnected) { this.loadProfileDetails(); }
      });
    });
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('didFocus');
  }

  loadProfileDetails = () => {
    this.setState({ loading: true });
    getCurrentUserProfile()
      .then(profile => this.setState({ profile, loading: false }));
  }

  onEditPress = () => {
    const { profile } = this.state;
    const editedProfile = JSON.parse(JSON.stringify(profile));
    this.setState({
      editMode: true,
      editedProfile
    });
  }

  onEditCancel = () => {
    this.setState({
      editMode: false,
      editedProfile: null
    });
  }

  onSaveProfile = () => {
    this.setState({ processing: true });
    updateUserProfile(this.state.editedProfile)
      .then(() => {
        this.setState({ editMode: false, processing: false });
        this.loadProfileDetails();
      }).catch((err) => {
        this.setState({
          editMode: true,
          errorMessage: getAxiosErrorMessage(err),
          processing: false
        });
      });
  }

  render() {
    if (!this.state.isConnected) {
      return <OfflineIndicator onRetryPress={this.loadProfileDetails} />;
    }
    const { name, email, mobile } = this.state.profile;
    const { loading, editMode, editedProfile, errorMessage, processing } = this.state;
    if (loading) {
      return (<LoadingIndicator />);
    }
    return (
      <View style={containerStyle}>
        <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
          <Avatar rounded title={getAvatarText(name)} size="large" />
        </View>

        <FormInput
          name="name"
          iconName="md-person"
          defaultValue={editMode ? editedProfile.name : name}
          disabled={!editMode}
          editable={editMode}
        />

        <FormInput
          name="email"
          iconName="md-mail"
          value={email}
          editable={false}
        />

        <FormInput
          name="mobile"
          iconName="md-phone-portrait"
          defaultValue={editMode ? editedProfile.mobile : mobile}
          disabled={!editMode}
          editable={editMode}
        />

        <FormInput
          iconName="md-finger-print"
          name="password"
          disabled
          value="Change password"
          editable={false}
        />

        {!editMode && <Button title="Edit profile" onPress={this.onEditPress} />}
        { editMode && (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ padding: 5 }}><Button title="Cancel" onPress={this.onEditCancel} disabled={processing} /></View>
          <View style={{ padding: 5 }}><Button title="Save" onPress={this.onSaveProfile} loading={processing} disabled={processing} /></View>
        </View>
        )}
        { errorMessage && <Text style={errorStyle}>{errorMessage}</Text>}
      </View>
    );
  }
}

export default SettingsScreen;
