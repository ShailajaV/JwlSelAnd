/* Customized text input component */
import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import styles from './CommonCSS';
import { UNDEFINED } from '../../actions/constants';

class InputText extends Component {
  onChangeValue() {
    this.props.onChange(this.props.uniqueName, this.props.value);
  }

  handleBlur() {
    this.props.validate(this.props);
  }
  render() {
    const { inputContainerStyle } = styles;
    let inputStyle;
    if (typeof this.props.styleObj !== UNDEFINED) inputStyle = this.props.styleObj;
    else inputStyle = styles.inputStyle;
    return (
      <View style={inputContainerStyle} >
        <TextInput
          underlineColorAndroid='transparent'
          editable={this.props.editable}
          secureTextEntry={this.props.secureTextEntry}
          placeholder={this.props.placeholder}
          autoCorrect={false}
          style={inputStyle}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          placeholderTextColor='#000'
          onBlur={(value) => this.handleBlur(value)}
          onChange={(value) => this.onChangeValue(value)}
          autoCapitalize={'none'}
          selectionColor='#000000'
        />
      </View>
    );
  }
}
export { InputText };
