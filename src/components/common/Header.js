/* Customized header component */
import React from 'react';
import { Text, View } from 'react-native';

// Make a Component
const Header = ({ onPress }) => {
  const { textstyle, viewStyle } = styles;

  return (
  <View style={viewStyle}>
   <Text onPress={onPress} style={textstyle}>Menu</Text>
  </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 60,
    paddingTop: 15
  },
  textstyle: {
    fontSize: 20
  }
};
// Make the component available to other parts of the App
export { Header };
