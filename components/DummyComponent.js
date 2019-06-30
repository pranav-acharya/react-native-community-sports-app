import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { dummyAction } from '../actions';

class DummyComponent extends Component {

  componentWillMount() {
    setTimeout(() => {
      this.props.dummyAction()
    }, 4000);
  }

  render() {
    return (
      <View>
        <Text>Some dummy text</Text>
        <Text>{this.props.auth}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, {
  dummyAction
})(DummyComponent);
