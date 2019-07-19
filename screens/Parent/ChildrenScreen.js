import React, { Component } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Button, ListItem } from 'react-native-elements';

import NewChildScreen from './NewChildScreen';
import { formButtonStyle } from '../../utils/styles';
import LoadingIndicator from '../../components/commons/LoadingIndicator';

const DUMMY_CHILDREN = [
  {
    id: '10',
    name: 'Ananya',
    age: '9',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    gender: 'Female'
  }
];

class ChildrenScreen extends Component {
  state = {
    children: [],
    loading: true,
  }

  componentDidMount() {
    this.loadChildren();
  }

  loadChildren = () => {
    setTimeout(() => {
      this.setState({
        children: DUMMY_CHILDREN,
        loading: false
      });
    }, 1000);
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
                leftAvatar={{ source: { uri: child.avatar } }}
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
