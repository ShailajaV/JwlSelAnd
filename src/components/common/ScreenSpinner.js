/* A spinner while processing a request */
import React from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';


const ScreenSpinner = ({ visible }) => {
  return (
    <View style={{ flex: 1 }}>
      <Spinner visible={visible} />
    </View>
  );
};

export { ScreenSpinner };
