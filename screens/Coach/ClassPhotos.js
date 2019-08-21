import React, { Component } from 'react';
import { View, Alert, Dimensions, ScrollView } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';
import ImageBrowser from './ImageBrowser';
import LoadingIndicator from '../../components/commons/LoadingIndicator';
import { formButtonStyle, errorStyle } from '../../utils/styles';

const { width } = Dimensions.get('window');

const IMAGE_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/whatsyourchase123/image/upload';
const IMAGE_UPLOAD_CONFIG = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
  body: null, // Assign form data here
};

const convertLocalIdentifierToAssetLibrary = (pathRaw) => {
  // const hash = localIdentifier.split('/')[0];
  // return `assets-library://asset/asset.${ext}?id=${hash}&ext=${ext}`;
  const regex = /:\/\/(.{36})\//i;
  const result = pathRaw.match(regex);
  return `assets-library://asset/asset.JPG?id=${result[1]}&ext=JPG`;
};

export default class ClassPhotos extends Component {
  state = {
    existingImages: [],
    selectedImages: [],
    imageBrowserOpen: false,
    loading: false,
    uploading: null,
    uploadSuccess: false,
    uploadError: null
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    // if (Constants.platform.ios) {
    //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //   if (status !== 'granted') {
    //     Alert.alert('Sorry, we need camera roll permissions to make this work!');
    //   }
    // }
  }

  imageBrowserCallback = (callback) => {
    callback.then(selectedImages => this.setState({ selectedImages, imageBrowserOpen: false }));
  }

  uploadSelectedImages = () => {
    const { selectedImages } = this.state;
    if (selectedImages.length === 0) { return; }
    const imageSource = selectedImages[0];
    const formData = new FormData();
    const uri = convertLocalIdentifierToAssetLibrary(imageSource.file);
    formData.append('file', { uri, name: 'testtrainer', type: 'image/jpeg' });
    formData.append('upload_preset', 'default-preset');
    IMAGE_UPLOAD_CONFIG.body = formData;
    this.setState({ uploading: true, uploadSuccess: null, uploadError: null });
    fetch(IMAGE_UPLOAD_URL, IMAGE_UPLOAD_CONFIG)
      .then(response => Promise.all([response.status, response.json()]))
      .then(([status, responseJson]) => {
        console.log(status, responseJson);
        if (status !== 200 && status !== 201) { throw new Error(responseJson.error.message); }
        this.setState({ imageBrowserOpen: false, uploading: false, uploadSuccess: true });
      })
      .catch((exc) => {
        console.log('err', exc);
        this.setState({
          imageBrowserOpen: false,
          uploading: false,
          uploadSuccess: false,
          uploadError: exc.message
        });
      });
  };

  renderImage = (image) => {
    console.log(image);
    return (
      <Image
        style={{ width: width / 4, height: width / 4 }}
        source={{ uri: convertLocalIdentifierToAssetLibrary(image.file) }}
        key={image.file}
      />
    );
  }

  getItemLayout = (data, index) => {
    const length = width / 4;
    return { length, offset: length * index, index };
  }

  render() {
    const { selectedImages, loading, imageBrowserOpen, existingImages, uploading, uploadError, uploadSuccess } = this.state;
    if (loading) {
      return <LoadingIndicator />;
    }
    if (imageBrowserOpen) {
      return (<ImageBrowser max={4} callback={this.imageBrowserCallback} />);
    }
    return (
      <View>
        <Text>Add existing photos for reference here</Text>
        <ScrollView horizontal>
          {existingImages.map(image => this.renderImage(image))}
        </ScrollView>

        <View>
          <Button
            title="Choose Images"
            onPress={() => this.setState({ imageBrowserOpen: true })}
            buttonStyle={formButtonStyle}
          />

          <ScrollView horizontal>
            {selectedImages.map(image => this.renderImage(image))}
          </ScrollView>

          { selectedImages.length > 0 && (
          <Button
            title="Upload Images"
            onPress={this.uploadSelectedImages}
            buttonStyle={formButtonStyle}
            loading={uploading}
            disabled={uploading}
          />
          )
          }
          {
            uploadSuccess && <Text>Image was uploaded succesfully</Text>
          }
          {
            uploadError !== null && <Text style={errorStyle}>{uploadError}</Text>
          }
        </View>

      </View>
    );
  }
}
