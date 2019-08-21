import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { containerStyle, formButtonStyle } from '../../utils/styles';
import SelectList from '../../components/commons/SelectList';
import { getMyChildren, getCommunities, getSports, getBatchesByCommunity, enrollChild } from '../../api/services';
import { getAxiosErrorMessage } from '../../utils/helpers';

class EnrollScreen extends Component {
  state = {
    childId: null,
    communityId: null,
    sportId: null,
    batchId: null,
    childrenList: [],
    communityList: [],
    sportsList: [],
    batchList: [],
    loadingChildren: false,
    loadingCommunities: false,
    loadingSports: false,
    loadingBatches: false,
    enrollStatusModal: false,
    enrollSuccess: null,
    enrollError: null,
    creatingEnrollment: false
  }

  loadState = () => {
    getMyChildren()
      .then(childrenList => this.setState({ childrenList, loadingChildren: false }));

    getCommunities()
      .then(communityList => this.setState({ communityList, loadingCommunities: false }));

    // getSports()
    //   .then(sportsList => this.setState({ sportsList, loadingSports: false }));

  // getBatches()
  //   .then(batchList => this.setState({ batchList, loadingBatches: false }));
  }

  componentWillMount = () => {
    this.loadState();
  }

  getDisabled = () => {
    const { childId, communityId, batchId } = this.state;
    return (childId == null || communityId == null || batchId == null);
  }

  createEnrollment = () => {
    const { childId, batchId } = this.state;
    this.setState({
      creatingEnrollment: true,
      enrollError: null,
      enrollSuccess: null
    });
    enrollChild(childId, batchId)
      .then((response) => {
        this.setState({ enrollStatusModal: true, enrollSuccess: true });
      }).catch((err) => {
        this.setState({
          enrollStatusModal: true,
          enrollSuccess: false,
          enrollError: getAxiosErrorMessage(err) });
      });
  }

  render() {
    const { childrenList, communityList, sportsList, batchList, enrollStatusModal, enrollSuccess, enrollError, creatingEnrollment } = this.state;
    const { communityId, batchId, childId } = this.state;
    const { loadingChildren, loadingBatches, loadingSports, loadingCommunities } = this.state;
    return (
      <View style={containerStyle}>
        <SelectList
          title="Select a community"
          list={communityList}
          uniqueIdentifier="name"
          onSelect={(item) => {
            this.setState({ communityId: item.name });
          }}
          loadingCommunities={loadingCommunities}
        />

        {/* <SelectList
          title="Select a sport"
          list={sportsList}
          uniqueIdentifier="name"
          onSelect={(item) => {
            this.setState({ sportId: item.name });
          }}
        /> */}

        <SelectList
          title="Select a batch"
          list={batchList}
          uniqueIdentifier="name"
          onSelect={(item) => {
            this.setState({ batchId: item.name });
          }}
          fetchData={() => getBatchesByCommunity(communityId)}
          lazyFetch
        />

        <SelectList
          title="Select the child for enrollment"
          list={childrenList}
          uniqueIdentifier="name"
          onSelect={(item) => {
            this.setState({ childId: item.name });
          }}
          busy={loadingChildren}
        />


        <Button
          disabled={this.getDisabled()}
          icon={<Ionicon name="md-checkmark-circle" color="white" size={16} style={{ marginRight: 5 }} />}
          iconContainerStyle={{ marginRight: 5 }}
          title="Enroll"
          buttonStyle={formButtonStyle}
          loading={creatingEnrollment}
          onPress={this.createEnrollment}
        />

        <Button title="Refresh" onPress={this.loadState} />

        <Overlay isVisible={enrollStatusModal}>
          <View>
            {enrollSuccess && (<Text>Enrollment successful</Text>)}
            {!enrollSuccess && <Text>Enrollment failure</Text>}
            {!enrollSuccess && <Text>{enrollError}</Text>}
            <Button onPress={() => this.setState({ enrollStatusModal: false })} title="Dismiss" />
          </View>
        </Overlay>
      </View>
    );
  }
}

export default EnrollScreen;
