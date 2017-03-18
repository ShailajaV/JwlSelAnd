/* Customized header component */
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import styles from './CommonCSS';

// Make a Component
const MenuHeader = ({ onPress }) => {
  const { hamStyle, headerStyle, logoStyle } = styles;
  return (
    <View style={headerStyle}>
    <View style={{ width: 30, height: 50 }} >
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require('../common/images/ham.png')}
            style={hamStyle}
            resizeMode={Image.resizeMode.sretch}
          />
        </TouchableOpacity>
        </View>
        <View style={{ width: 40, height: 50 }} >
        <Image
          source={require('../common/images/edit.png')}
          style={logoStyle}
          resizeMode={Image.resizeMode.sretch}
        />
        </View>
      <View style={{ width: 10, height: 50 }} />
      </View>
  );
};
// Make the component available to other parts of the App
export { MenuHeader };
