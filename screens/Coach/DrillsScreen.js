import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import { containerStyle, formButtonStyle } from '../../utils/styles';

import LoadingIndicator from '../../components/commons/LoadingIndicator';
import NewDrillScreen from './NewDrillScreen';
import { getDrills } from '../../api/services';

class DrillsScreen extends Component {
  state = {
    drills: [],
    loading: true,
  }

  componentDidMount() {
    this.loadDrills();
  }

  loadDrills = () => {
    getDrills()
      .then(drills => this.setState({ drills, loading: false }));
  }

  render() {
    const { loading, drills } = this.state;
    if (loading) {
      return <LoadingIndicator />;
    }

    return (
      <View>
        <View style={{ minHeight: 200 }}>
          {
            drills.map(drill => (
              <ListItem
                key={drill.id}
                leftAvatar={{ source: { uri: drill.avatar } }}
                title={drill.name}
                subtitle={drill.description}
                bottomDivider
                chevron
              />
            ))
          }
        </View>

        <View>
          <Button
            buttonStyle={formButtonStyle}
            title="Add new drill"
            onPress={() => this.props.navigation.navigate('NewDrill')}
          />
        </View>
      </View>
    );
  }
}


const DrillsScreenNavigator = createStackNavigator({
  CoachDrills: {
    screen: DrillsScreen,
    navigationOptions: () => ({
      title: 'My Drills'
    })
  },
  NewDrill: {
    screen: NewDrillScreen,
    navigationOptions: () => ({
      title: 'New drill'
    })
  }
});

export default DrillsScreenNavigator;
