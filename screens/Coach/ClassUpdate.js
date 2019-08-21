import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import LoadingIndicator from '../../components/commons/LoadingIndicator';
import { formButtonStyle } from '../../utils/styles';

const PHOTOS = [
  ''
];

const StudentPerformanceUpdates = [
  {
    childId: '',
    comments: '',
    rating: 5
  }
];

export default class ClassUpdate extends Component {
  state = {
    photos: [],
    studentPerformanceUpdates: [],
    loading: true
  }

  componentDidMount() {
    this.class = this.props.navigation.state.params;
    this.loadBatchDetails();
  }

  loadBatchDetails = () => {
    setTimeout(() => this.setState({
      photos: PHOTOS,
      studentPerformanceUpdates: StudentPerformanceUpdates,
      loading: false
    }), 1000);
  }

  render() {
    const { loading, photos, studentPerformanceUpdates } = this.state;
    if (loading) { return <LoadingIndicator />; }
    console.log(photos, studentPerformanceUpdates);
    return (
      <View>
        <Text>No updates for this batch yet!</Text>
        <Text>Existing photos</Text>
        <Text>Existing updates</Text>
        <Button title="Add photos" onPress={() => this.props.navigation.navigate('ClassPhotos', this.class)} buttonStyle={formButtonStyle} />
        <Button title="Add stats" onPress={() => this.props.navigation.navigate('ClassStats', this.class)} buttonStyle={formButtonStyle} />
      </View>
    );
  }
}
