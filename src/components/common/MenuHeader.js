/* Customized header component */
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import styles from './CommonCSS';

// Make a Component
const MenuHeader = ({ onPress }) => {
  const { hamStyle, headerStyle } = styles;
  return (
    <View style={headerStyle}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={require('../common/images/ham.png')}
          style={hamStyle}
          resizeMode={Image.resizeMode.sretch}
        />
      </TouchableOpacity>
    </View>
  );
};
// Make the component available to other parts of the App
export { MenuHeader };
