/* Customized multi line text input component */
import React from 'react';
import { TextInput, View, Text } from 'react-native';

const MultilineInput = ({ label, value, onChangeText, placeholder, secureTextEntry, editable }) => {
const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        editable={editable}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        underlineColorAndroid='transparent'
        maxLength={255}
        multiline={true}
        numberOfLines={4}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 60,
    flex: 2,
    backgroundColor: '#fff'
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 2,
    fontFamily: 'Cochin',
    lineHeight: 23,
    height: 40


  },
  containerStyle: {
    height: 60,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};
export { MultilineInput };
