import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';


class StateConnectedScreen extends Component {
  componentWillMount() {
  }

  render() {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>This screen is connected to the redux store</Text>
        <Text>{JSON.stringify(this.props.auth)}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
}

export default connect(mapStateToProps,{
  
})(StateConnectedScreen);