/* Customized component for label and text box view */
import React from 'react';
import { View } from 'react-native';
import styles from './CommonCSS';

const Card = (props) => {
  return (
    <View style={[styles.cardStyle, props.style]}>
      {props.children}
    </View>
  );
};

export { Card };
