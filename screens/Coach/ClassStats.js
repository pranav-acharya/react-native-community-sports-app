import React, { Component } from 'react';
import { ListItem, Button } from 'react-native-elements';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import LoadingIndicator from '../../components/commons/LoadingIndicator';
import FormInput from '../../components/commons/FormInput';
import { formButtonStyle, containerStyle } from '../../utils/styles';
import { getBatchChildren } from '../../api/services';

export default class ClassStats extends Component {
  state = {
    loading: true,
    children: [],
    pendingChildren: [],
    selectedChildrenIds: []
  }

  componentDidMount() {
    this.loadChildren();
  }

  loadChildren = () => {
    getBatchChildren()
      .then(children => this.setState({ pendingChildren: children, loading: false }));
  }

  toggleChild = (child) => {
    const { selectedChildrenIds } = this.state;
    if (selectedChildrenIds.indexOf(child.id) >= 0) {
      this.setState({
        selectedChildrenIds: selectedChildrenIds.filter(childId => childId !== child.id)
      });
    } else {
      this.setState({
        selectedChildrenIds: [...selectedChildrenIds, child.id]
      });
    }
  }

  isChecked = child => this.state.selectedChildrenIds.indexOf(child.id) >= 0

  render() {
    const { loading, children, pendingChildren } = this.state;
    if (loading) { return <LoadingIndicator />; }
    return (

      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, backgroundColor: 'skyblue' }}>
          {
            pendingChildren.map(child => (
              <ListItem
                key={child.id}
                title={child.name}
                checkmark={this.isChecked(child)}
                onPress={() => this.toggleChild(child)}
              />
            ))
          }
        </ScrollView>
        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
              <View style={{ flex: 1 }}>
                <FormInput placeholder="Duration" label="Duration(mins)" keyboardType="phone-pad" iconName="md-timer" />
              </View>
              <View style={{ flex: 1 }}><FormInput placeholder="Count" label="Count" keyboardType="phone-pad" iconName="ios-speedometer" /></View>

            </View>
            <View style={{ flex: 1 }}>
              <Button title="Save" buttonStyle={formButtonStyle} />
            </View>

          </View>
        </KeyboardAvoidingView>
      </View>

    );
  }
}
