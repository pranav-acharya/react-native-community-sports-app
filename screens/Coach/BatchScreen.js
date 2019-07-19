import React, { Component } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Button, ListItem } from 'react-native-elements';
import { containerStyle, formButtonStyle } from '../../utils/styles';
import LoadingIndicator from '../../components/commons/LoadingIndicator';
import NewBatchScreen from './NewBatchScreen';

const DUMMY_CLASSES = [
  {
    id: 'batch1',
    name: 'Batch A',
    description: 'Under 12',
    sport: {
      name: 'badminton'
    },
    community: {
      name: 'Brigade lakefront'
    }
  }
];

class BatchScreen extends Component {
  state = {
    batches: [],
    loading: true,
  }

  componentDidMount() {
    this.loadClasses();
  }

  loadClasses = () => {
    setTimeout(() => {
      this.setState({
        batches: DUMMY_CLASSES,
        loading: false
      });
    }, 1000);
  }

  render() {
    const { loading, batches } = this.state;
    if (loading) return <LoadingIndicator />;

    return (
      <View style={{ width: '100%' }}>
        <View style={{ minHeight: 200 }}>
          {
            batches.map(batch => (
              <ListItem
                key={batch.id}
                leftAvatar={{ source: { uri: batch.avatar } }}
                title={batch.name}
                subtitle={batch.description}
                bottomDivider
                chevron
              />
            ))
          }
        </View>
        <Button title="Create Batch" onPress={() => this.props.navigation.navigate('NewBatch')} buttonStyle={formButtonStyle} />
      </View>
    );
  }
}

const BatchesScreenNavigator = createStackNavigator({
  CoachBatches: {
    screen: BatchScreen,
    navigationOptions: () => ({
      title: 'My Batches'
    })
  },
  NewBatch: {
    screen: NewBatchScreen,
    navigationOptions: () => ({
      title: 'New Batch'
    })
  }
});


export default BatchesScreenNavigator;
