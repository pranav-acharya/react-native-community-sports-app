import React, { Component } from 'react';
import { View, NetInfo } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Button, ListItem } from 'react-native-elements';

import NewChildScreen from './NewChildScreen';
import { formButtonStyle } from '../../utils/styles';
import LoadingIndicator from '../../components/commons/LoadingIndicator';
import { getMyChildren } from '../../api/services';

class ChildrenScreen extends Component {
  state = {
    children: [],
    loading: true,
  }

  componentDidMount() {
    this.loadChildren();
    this.props.navigation.addListener('didFocus', () => {
      NetInfo.isConnected.fetch().then((isConnected) => {
        // this.setState({ isConnected });
        if (isConnected) { this.loadChildren(); }
      });
    });
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('didFocus');
  }

  loadChildren = () => {
    this.setState({ loading: true });
    getMyChildren()
      .then(children => this.setState({ children, loading: false }));
  }

  render() {
    const { children, loading } = this.state;
    if (loading) return <LoadingIndicator />;

    return (
      <View>
        <View style={{ minHeight: 200 }}>
          {
            children.map(child => (
              <ListItem
                key={child.id}
                leftAvatar={{ source: { uri: child.thumbnail } }}
                title={child.name}
                subtitle={`${child.age} years old`}
                bottomDivider
                chevron
              />
            ))
          }
        </View>

        <View>
          <Button
            buttonStyle={formButtonStyle}
            title="Register new child"
            onPress={() => this.props.navigation.navigate('NewChild')}
          />
        </View>
      </View>
    );
  }
}

const ChildrenScreenNavigator = createStackNavigator({
  Children: {
    screen: ChildrenScreen,
    navigationOptions: () => ({
      title: 'Children'
    })
  },
  NewChild: {
    screen: NewChildScreen,
    navigationOptions: () => ({
      title: 'Register a child'
    })
  }
});

export default ChildrenScreenNavigator;
