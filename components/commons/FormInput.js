import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';

const FormInput = (props) => {
  const { iconName, placeholder } = props;
  return (
    <Input
      containerStyle={{
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'rgb(250,250,250)',
        borderColor: '#eee',
        borderWidth: 1,
        marginBottom: 10
      }}
      inputContainerStyle={{ margin: 0, padding: 0, borderBottomWidth: 0 }}
      placeholder={placeholder}
      leftIconContainerStyle={{ marginLeft: 0, marginRight: 5 }}
      leftIcon={<Ionicon name={iconName} size={20} style={styles.formInputIconStyle} color="gray" />}
      {...props}
    />
  );
};


const styles = StyleSheet.create({
  formInputIconStyle: {
    width: 20,
    height: 20
  },
});

export default FormInput;
