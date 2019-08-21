import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  FlatList,
  Dimensions,
  Button
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import ImageTile from './ImageTile';

const { width } = Dimensions.get('window');
const convertLocalIdentifierToAssetLibrary = (pathRaw) => {
  // const hash = localIdentifier.split('/')[0];
  // return `assets-library://asset/asset.${ext}?id=${hash}&ext=${ext}`;
  const regex = /:\/\/(.{36})\//i;
  const result = pathRaw.match(regex);
  return `assets-library://asset/asset.JPG?id=${result[1]}&ext=JPG`;
};

export default class ImageBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      selected: {},
      after: null,
      has_next_page: true
    };
  }

  componentDidMount() {
    this.getPhotos();
  }

  selectImage = (index) => {
    let newSelected = { ...this.state.selected };
    if (newSelected[index]) {
      delete newSelected[index];
    } else {
      newSelected[index] = true;
    }
    if (Object.keys(newSelected).length > this.props.max) return;
    if (!newSelected) newSelected = {};
    this.setState({ selected: newSelected });
  }

  getPhotos = () => {
    const params = { first: 50, mimeTypes: ['image/jpeg'], assetType: 'Photos' };
    if (this.state.after) params.after = this.state.after;
    if (!this.state.has_next_page) return;
    CameraRoll
      .getPhotos(params)
      .then(this.processPhotos);
  }

  processPhotos = (r) => {
    if (this.state.after === r.page_info.end_cursor) return;
    const uris = r.edges.map(i => i.node).map(i => i.image).map(i => i.uri);
    // console.log(r);
    this.setState(prevState => ({
      photos: [...prevState.photos, ...uris],
      after: r.page_info.end_cursor,
      has_next_page: r.page_info.has_next_page
    }));
  }

  getItemLayout = (data, index) => {
    const length = width / 4;
    return { length, offset: length * index, index };
  }

  prepareCallback() {
    const { selected, photos } = this.state;
    const selectedPhotos = photos.filter((item, index) => (selected[index]));
    const files = selectedPhotos
      .map(i => FileSystem.getInfoAsync(convertLocalIdentifierToAssetLibrary(i), { md5: true }));
    const callbackResult = Promise
      .all(files)
      .then(imageData => imageData.map((data, i) => ({ file: selectedPhotos[i], ...data })));
    this.props.callback(callbackResult);
  }

  renderHeader = () => {
    const selectedCount = Object.keys(this.state.selected).length;
    let headerText = `${selectedCount} Selected`;
    if (selectedCount === this.props.max) headerText += ' (Max)';
    return (
      <View style={styles.header}>
        <Button
          title="Exit"
          onPress={() => this.props.callback(Promise.resolve([]))}
        />
        <Text>{headerText}</Text>
        <Button
          title="Choose"
          onPress={() => this.prepareCallback()}
        />
      </View>
    );
  }

  renderImageTile = ({ item, index }) => {
    const selected = !!this.state.selected[index];
    return (
      <ImageTile
        item={item}
        index={index}
        selected={selected}
        selectImage={this.selectImage}
      />
    );
  }

  renderImages() {
    return (
      <FlatList
        data={this.state.photos}
        numColumns={4}
        renderItem={this.renderImageTile}
        keyExtractor={(_, index) => index}
        onEndReached={this.getPhotos}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<Text>Loading...</Text>}
        initialNumToRender={24}
        getItemLayout={this.getItemLayout}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderImages()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    width,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 20
  },
});
