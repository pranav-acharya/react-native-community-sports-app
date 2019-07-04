import React, { Component } from 'react';
import { View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { containerStyle } from '../../utils/styles';


class ClassesScreen extends Component {
  state = {
    selectedStartDate: null,
    selectedEndDate: null
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

  render() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(); // Today
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';


    return (
      <View style={containerStyle}>
        <CalendarPicker
          startFromMonday
          allowRangeSelection
          minDate={minDate}
          startDate={startDate}
          endDate={endDate}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          scaleFactor={375}
          onDateChange={this.onDateChange}
        />
      </View>
    );
  }
}

export default ClassesScreen;
