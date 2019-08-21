import React, { Component } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Button, ListItem } from 'react-native-elements';
import { containerStyle, formButtonStyle } from '../../utils/styles';
import LoadingIndicator from '../../components/commons/LoadingIndicator';
import NewBatchScreen from './NewBatchScreen';
import ClassUpdate from './ClassUpdate';
import ClassPhotos from './ClassPhotos';
import ClassStats from './ClassStats';
import { getBatchesByCoach } from '../../api/services';
import BatchClasses from './BatchClasses';


class BatchScreen extends Component {
  state = {
    batches: [],
    loading: true,
  }

  componentDidMount() {
    this.loadClasses();
  }

  loadClasses = () => {
    getBatchesByCoach('some coach ID')
      .then(batches => this.setState({ batches, loading: false }));
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
                onPress={() => this.props.navigation.navigate('BatchClasses', batch)}
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
  },
  BatchClasses: {
    screen: BatchClasses,
    navigationOptions: () => ({
      title: 'Classes'
    })
  },
  ClassUpdate: {
    screen: ClassUpdate,
    navigationOptions: ({ navigation }) => ({
      title: `Batch - ${navigation.state.params.name}`,
    }),
  },
  ClassPhotos: {
    screen: ClassPhotos,
    navigationOptions: ({ navigation }) => ({
      title: `Photos - ${navigation.state.params.name}`,
    }),
  },
  ClassStats: {
    screen: ClassStats,
    navigationOptions: ({ navigation }) => ({
      title: `Performance - ${navigation.state.params.name}`,
    }),
  }
});


export default BatchesScreenNavigator;
