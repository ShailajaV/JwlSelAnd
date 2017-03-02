/* Customized text input component */
import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';

class Input extends Component {
  componentWillMount() {
    //this.refs.theToolTip.showMenu();
    return {
      input: 'chirag',
    };
  }
  onChangeValue() {
    this.props.onChange(this.props.uniqueName, this.props.value);
  }

  handleBlur() {
    this.props.validate(this.props);
  }
  render() {
    const { inputStyle, labelStyle, containerStyle, errorTextStyle } = styles;

    return (
      <View style={containerStyle} >
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
          onBlur={(value) => this.handleBlur(value)}
          onChange={(value) => this.onChangeValue(value)}
        />
        <Text style={errorTextStyle}>
          {this.props.errorMessage}
        </Text>
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
    lineHeight: 23,
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
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export { Input };
