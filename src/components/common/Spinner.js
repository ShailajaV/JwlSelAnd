/* A spinner while processing a request */
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './CommonCSS';

const Spinner = ({ size }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
};

export { Spinner };
