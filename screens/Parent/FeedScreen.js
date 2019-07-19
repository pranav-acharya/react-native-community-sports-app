import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Card, Button } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { containerStyle } from '../../utils/styles';

// TODO: decide structure of feeds

const feeds = [
  {
    type: 'accomplishment',
    shortDescription: '',
    longDescription: '',
    image: null
  },
  {
    type: 'accomplishment',
    shortDescription: '',
    longDescription: '',
    image: ''
  }
];

const FeedScreen = () => (
  <ScrollView contentContainerStyle={{ ...containerStyle, backgroundColor: '#eee', padding: 5 }}>
    <Card
      title="Badminton - Under 10 girls"
      image={{ uri: 'https://api.sporthood.in/media/game/sporthood_badminton_academy.jpg' }}
      containerStyle={{ width: '100%' }}
    >
      <Text style={{ marginBottom: 10 }}>
        Batch B. Timings 6 - 7:30 pm
      </Text>
      <Button
        icon={<Ionicon name="ios-arrow-forward" color="white" size={22} style={{ marginLeft: 18, lineHeight: 22 }} />}
        iconRight
        backgroundColor="#03A9F4"
        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
        titleStyle={{ paddingBottom: 6 }}
        title="Show all photos"
      />
    </Card>

    <Card title="Badminton - Under 10 girls" style={{ flexDirection: 'row' }} containerStyle={{ width: '100%' }}>
      <View style={{ flexDirection: 'row' }}>
        <Ionicon name="md-checkmark-circle" size={22} style={{ marginRight: 8 }} color="green" />
        <Text style={{ color: 'green' }}>Ananya completed all drills of the Badminton sports class!</Text>
      </View>
    </Card>
  </ScrollView>
);

export default FeedScreen;
