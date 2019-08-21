import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { containerStyle, formButtonStyle } from '../../utils/styles';
import LoadingIndicator from '../../components/commons/LoadingIndicator';
import { getBatchClasses } from '../../api/services';


class BatchClasses extends Component {
  state = {
    classes: [],
    loading: true,
  }

  componentDidMount() {
    this.loadClasses();
  }

  loadClasses = () => {
    getBatchClasses(this.props.batchId)
      .then(classes => this.setState({ classes, loading: false }));
  }

  render() {
    const { loading, classes } = this.state;
    if (loading) return <LoadingIndicator />;

    return (
      <View style={{ width: '100%' }}>
        <View style={{ minHeight: 200 }}>
          {
            classes.map(batchClass => (
              <ListItem
                key={batchClass.id}
                leftAvatar={{ source: { uri: batchClass.avatar } }}
                title={batchClass.name}
                subtitle={batchClass.description}
                bottomDivider
                chevron
                onPress={() => this.props.navigation.navigate('ClassUpdate', batchClass)}
              />
            ))
          }
        </View>
      </View>
    );
  }
}

export default BatchClasses;
