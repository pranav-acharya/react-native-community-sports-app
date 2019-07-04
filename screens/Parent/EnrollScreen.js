import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { containerStyle, formButtonStyle } from '../../utils/styles';
import SelectList from '../../components/commons/SelectList';

const childrenList = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: '8 yrs'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: '6 yrs'
  }
];

const communityList = [
  {
    name: 'Brigade Lakefront',
    subtitle: 'Hoodi'
  },
  {
    name: 'Prestige Shantiniketan',
    subtitle: 'Whitefield'
  }
];

const classList = [
  {
    name: 'Football',
    subtitle: 'Hoodi'
  },
  {
    name: 'Badminton',
    subtitle: 'Whitefield'
  }
];

const batchList = [
  {
    name: 'Batch A',
    subtitle: '9:30 - 11 am'
  },
  {
    name: 'Batch B',
    subtitle: '6 - 7:30 pm'
  }
];

class EnrollScreen extends Component {
  state = {
    childId: null,
    communityId: null,
    sportId: null,
    batchId: null,
  }

  getDisabled = () => {
    const { childId, communityId, sportId, batchId } = this.state;
    return (childId == null || communityId == null || sportId == null || batchId == null);
  }

  render() {
    return (
      <View style={containerStyle}>

        <SelectList
          title="Select a person"
          list={childrenList}
          uniqueIdentifier="name"
          onSelect={(item) => {
            this.setState({ childId: item.name });
          }}
        />

        <SelectList
          title="Select a community"
          list={communityList}
          uniqueIdentifier="name"
          onSelect={(item) => {
            this.setState({ communityId: item.name });
          }}
        />

        <SelectList
          title="Select a class"
          list={classList}
          uniqueIdentifier="name"
          onSelect={(item) => {
            this.setState({ sportId: item.name });
          }}
        />

        <SelectList
          title="Select a batch"
          list={batchList}
          uniqueIdentifier="name"
          onSelect={(item) => {
            this.setState({ batchId: item.name });
          }}
        />

        <Button
          disabled={this.getDisabled()}
          icon={<Ionicon name="md-checkmark-circle" color="white" size={16} style={{ marginRight: 5 }} />}
          iconContainerStyle={{ marginRight: 5 }}
          title="Enroll"
          buttonStyle={formButtonStyle}
        />
      </View>
    );
  }
}

export default EnrollScreen;
