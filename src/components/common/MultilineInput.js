/* Customized multi line text input component */
import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';
import styles from './CommonCSS';

class MultilineInput extends Component {
  onChangeValue() {
    this.props.onChange(this.props.uniqueName, this.props.value);
  }

  handleBlur() {
    this.props.validate(this.props);
  }
  render() {
    const { mulInputStyle, labelStyle, mulInpcontainerStyle } = styles;

    return (
      <View style={mulInpcontainerStyle}>
        <Text style={labelStyle}>{this.props.label}</Text>
        <TextInput
          editable={this.props.editable}
          secureTextEntry={this.props.secureTextEntry}
          placeholder={this.props.placeholder}
          autoCorrect={false}
          style={mulInputStyle}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          underlineColorAndroid='transparent'
          multiline
          numberOfLines={4}
          onBlur={(value) => this.handleBlur(value)}
          onChange={(value) => this.onChangeValue(value)}
        />
      </View>
    );
  }
}
export { MultilineInput };
