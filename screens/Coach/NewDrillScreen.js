import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { containerStyle, formButtonStyle, errorStyle } from '../../utils/styles';

import FormInput from '../../components/commons/FormInput';
import SelectList from '../../components/commons/SelectList';

const classList = [
  {
    id: 'Football',
    name: 'Football',
    subtitle: 'Hoodi'
  },
  {
    id: 'Badmintom',
    name: 'Badminton',
    subtitle: 'Whitefield'
  }
];


class NewDrillScreen extends Component {
  state = {
    selectedSportId: null,
    fields: {
      name: null,
      description: null
    },
    errors: {

    }
  }

  submit = () => {
    const values = this.state.fields;
    const errors = validate(values);
    const errorExists = Object.values(errors).some(
      errorVal => errorVal !== undefined
    );

    this.setState({ errors });
    if (!errorExists) { this.props.loginPress(values); }
  };

  handleChange = fieldName => (text) => {
    const { fields } = this.state;
    fields[fieldName] = text;
    this.setState({ fields });
  }


  render() {
    return (
      <View style={containerStyle}>
        <View style={{ width: 300 }}>
          <SelectList
            title="Select a sport class"
            list={classList}
            uniqueIdentifier="id"
            onSelect={(item) => {
              this.setState({ selectedSportId: item.id });
            }}
          />

          <FormInput
            placeholder="Drill Name"
            name="name"
            errorStyle={errorStyle}
            errorMessage={this.state.errors.name}
            onChangeText={this.handleChange('name')}
          />

          <FormInput
            placeholder="Drill description"
            name="description"
            errorStyle={errorStyle}
            errorMessage={this.state.errors.description}
            onChangeText={this.handleChange('description')}
          />

          <Text visible={false} style={{ ...errorStyle, textAlign: 'center', width: '100%', marginTop: 20 }}>
            {'Some error on HTTP request'}
          </Text>

          <Button buttonStyle={formButtonStyle} title="Create new drill" onPress={() => console.log(this.state)} />
        </View>
      </View>
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


export default NewDrillScreen;
