/* Customized header component */
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

// Make a Component
const MenuHeader = ({ onPress }) => {
  const { imageStyle, viewStyle } = styles;

  return (
  <View style={viewStyle}>
  <TouchableOpacity onPress={onPress}>
    <Image
      source={require('../common/images/ham.png')}
      style={imageStyle}
      resizeMode={Image.resizeMode.sretch}
    />
  </TouchableOpacity>
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
  },
  imageStyle: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'flex-end'
  }
};
// Make the component available to other parts of the App
export { MenuHeader };
