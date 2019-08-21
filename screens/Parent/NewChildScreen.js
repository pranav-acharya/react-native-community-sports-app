import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Button, CheckBox, Avatar, Text } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { Permissions, Constants } from 'expo';
import FormInput from '../../components/commons/FormInput';
import { containerStyle, formButtonStyle } from '../../utils/styles';
import { getAxiosErrorMessage } from '../../utils/helpers';
import { getMyChildren, uploadImage, addChild } from '../../api/services';


class NewChildScreen extends Component {
  state = {
    fields: {
      image: null,
      name: '',
      age: null,
      gender: 'male'
    },
    errors: {},
    processing: false,
    error: null,
  }

  registerChild = () => {
    this.setState({ processing: true });
    const { name, age, gender, image } = this.state.fields;
    uploadImage(image)
      .then((response) => {
        const thumbnail = response.data.secure_url;
        return addChild({ name, age, gender, thumbnail });
      })
      .then(() => {
        this.setState({ processing: false });
        // navigate to children screen
        // reset fields
        this.props.navigation.navigate('Children');
      })
      .catch((err) => {
        this.setState({ error: getAxiosErrorMessage(err), processing: false });
        // console.log('logging err', err);
        // console.log(JSON.stringify(err));
      });
    // getMyChildren()
    //   .then(child => this.setState({ processing: false }))
    //   .catch(err => this.setState({ processing: false, error: err.message }));
  }

  openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      const { fields } = this.state;
      fields.image = result.uri;
      this.setState({ fields });
    }
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  handleChange = fieldName => (text) => {
    const { fields } = this.state;
    fields[fieldName] = text;
    this.setState({ fields });
  };

  render() {
    const { processing, fields, error } = this.state;
    const { image, gender, name, age } = fields;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="padding" enabled style={containerStyle}>
          <View style={{ width: 250, alignItems: 'center' }}>
            <View style={{ height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
              <Avatar
                rounded
                showEditButton
                size="xlarge"
                onEditPress={this.openImagePicker}
                source={{ uri: image }}
              />
            </View>
            <FormInput
              placeholder="Full name"
              iconName="md-person"
              name="name"
              value={name}
              errorMessage={this.state.errors.name}
              onChangeText={this.handleChange('name')}
            />

            <FormInput
              placeholder="Age"
              iconName="md-time"
              keyboardType="numeric"
              name="age"
              value={age}
              errorMessage={this.state.errors.name}
              onChangeText={this.handleChange('age')}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox
                title="Male"
                containerStyle={{ width: '50%', marginRight: 0, marginLeft: 0 }}
                checked={gender === 'male'}
                onPress={() => this.setState({ fields: { ...fields, gender: 'male' } })}
              />
              <CheckBox
                title="Female"
                containerStyle={{ width: '50%', marginRight: 0, marginLeft: 0 }}
                checked={gender === 'female'}
                onPress={() => this.setState({ fields: { ...fields, gender: 'female' } })}
              />
            </View>

            <Button
              title="Register Child"
              buttonStyle={formButtonStyle}
              loading={processing}
              disabled={processing}
              onPress={this.registerChild}
            />
            <Text style={{ alignSelf: 'center', color: 'red' }}>{ error }</Text>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

export default NewChildScreen;
