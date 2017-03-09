/* Customized button component */
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './CommonCSS';

const Button = ({ onPress, children }) => {
  const { buttonStyle, buttonTextStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={buttonTextStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export { Button };
