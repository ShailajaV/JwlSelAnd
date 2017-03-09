/* Customized component for label and text box view */
import React from 'react';
import { View } from 'react-native';
import styles from './CommonCSS';

const CardSection = (props) => {
  return (
    <View style={[styles.cardSectionStyle, props.style]}>
    {props.children}
    </View>
  );
};

export { CardSection };
