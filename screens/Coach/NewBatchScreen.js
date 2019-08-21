import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, KeyboardAvoidingView, View } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';

import { formButtonStyle, errorStyle } from '../../utils/styles';
import { formatDate } from '../../utils/helpers';
import FormInput from '../../components/commons/FormInput';
import SelectList from '../../components/commons/SelectList';
import { getCommunities, getSports } from '../../api/services';

class NewBatchScreen extends Component {
  state = {
    selectedSportId: null,
    communityList: [],
    sportsList: [],
    communityId: null,
    showCalendarOverlay: false,
    selectedStartDate: null,
    selectedEndDate: null,
    capacity: 10,
    fields: {
      name: null,
      description: null
    },
    errors: {

    }
  }

  componentDidMount() {
    getCommunities()
      .then(communityList => this.setState({ communityList }));

    getSports()
      .then(sportsList => this.setState({ sportsList }));
  }

  getFormattedDateRange = () => {
    const { selectedStartDate, selectedEndDate } = this.state;
    if (selectedStartDate == null || selectedEndDate == null) { return null; }
    return `${formatDate(selectedStartDate)} - ${formatDate(selectedEndDate)}`;
  }

  handleChange = fieldName => (text) => {
    const { fields } = this.state;
    fields[fieldName] = text;
    this.setState({ fields });
  }

  onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }

  submit = () => {
    const values = this.state.fields;
    const { selectedSportId, communityId, capacity } = this.state;
    const errors = validate(values);
    const errorExists = Object.values(errors).some(
      errorVal => errorVal !== undefined
    );
    console.log(selectedSportId, communityId, capacity);
    this.setState({ errors });
    if (!errorExists) { this.props.loginPress(values); }
  };

  render() {
    const { selectedStartDate, selectedEndDate, communityList, sportsList } = this.state;
    const minDate = new Date(); // Today
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';


    return (
      <KeyboardAvoidingView behavior="position" enabled>
        <ScrollView>

          <SelectList
            title="Select a community"
            headerText="Choose a community"

            uniqueIdentifier="name"
            onSelect={(item) => {
              this.setState({ communityId: item.name });
            }}
            fetchData={getCommunities}
          />

          <SelectList
            title="Select a sport class"

            uniqueIdentifier="id"
            onSelect={(item) => {
              this.setState({ selectedSportId: item.id });
            }}
            fetchData={getSports}
          />

          <TouchableOpacity onPress={() => this.setState({ showCalendarOverlay: true })}>
            <FormInput
              iconName="md-calendar"
              placeholder="Select dates"
              pointerEvents="none"
              value={this.getFormattedDateRange()}
              editable={false}
            />
          </TouchableOpacity>

          <FormInput
            iconName="md-information-circle-outline"
            placeholder="Drill Name"
            name="name"
            errorStyle={errorStyle}
            errorMessage={this.state.errors.name}
            onChangeText={this.handleChange('name')}
          />

          <FormInput
            iconName="md-information-circle-outline"
            placeholder="Drill description"
            name="description"
            errorStyle={errorStyle}
            errorMessage={this.state.errors.description}
            onChangeText={this.handleChange('description')}
          />

          <FormInput
            iconName="md-contacts"
            placeholder="Batch Capacity"
            name="capacity"
            errorStyle={errorStyle}
            keyboardType="numeric"
            errorMessage={this.state.errors.capacity}
            onChangeText={this.handleChange('capacity')}
          />

          <Button title="Create Batch" onPress={this.submit} buttonStyle={formButtonStyle} />
        </ScrollView>

        <Overlay
          isVisible={this.state.showCalendarOverlay}
          onBackdropPress={() => this.setState({ showCalendarOverlay: false })}
          width="auto"
          height="auto"
        >
          <CalendarPicker
            startFromMonday
            allowRangeSelection
            minDate={minDate}
            todayBackgroundColor="#f2e6ff"
            selectedStartDate={startDate}
            selectedEndDate={endDate}
            selectedDayColor="#7300e6"
            selectedDayTextColor="#FFFFFF"
            scaleFactor={375}
            onDateChange={this.onDateChange}
          />

          <View>
            <Button
              title="Done"
              onPress={() => this.setState({ showCalendarOverlay: false })}
              buttonStyle={formButtonStyle}
            />
          </View>
        </Overlay>

      </KeyboardAvoidingView>
    );
  }
}

const validate = (values) => {
  const errors = {};
  errors.name = !values.name
    ? 'Email field is required'
    : undefined;

  errors.description = !values.description
    ? 'Please provide minimal description'
    : undefined;

  return errors;
};

export default NewBatchScreen;
