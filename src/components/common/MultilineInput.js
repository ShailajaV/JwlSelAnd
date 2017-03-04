/* Customized multi line text input component */
import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';

class MultilineInput extends Component {
  onChangeValue() {
    this.props.onChange(this.props.uniqueName, this.props.value);
  }

  handleBlur() {
    this.props.validate(this.props);
  }
  render() {
    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
      <View style={containerStyle}>
        <Text style={labelStyle}>{this.props.label}</Text>
        <TextInput
          editable={this.props.editable}
          secureTextEntry={this.props.secureTextEntry}
          placeholder={this.props.placeholder}
          autoCorrect={false}
          style={inputStyle}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          underlineColorAndroid='transparent'
          maxLength={255}
          multiline
          numberOfLines={4}
          onBlur={(value) => this.handleBlur(value)}
          onChange={(value) => this.onChangeValue(value)}
        />
      </View>
    );
  }
}

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
