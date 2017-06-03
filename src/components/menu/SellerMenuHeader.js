/* Customized seller header component */
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import styles from '../common/CommonCSS';

// Make a Component
const SellerMenuHeader = ({ onPress }) => {
  const { hamStyle, headerStyle, logoStyle } = styles;
  return (
    <View style={headerStyle}>
      <View style={{ width: 50, height: 50 }} >
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require('../common/images/ham.png')}
            style={hamStyle}
            resizeMode={Image.resizeMode.strech}
          />
        </TouchableOpacity>
      </View>
      <View style={{ width: 50, height: 50 }} >
        <Image
          source={require('../common/images/logo_action_bar.png')}
          style={logoStyle}
          resizeMode={Image.resizeMode.strech}
        />
      </View>
      <View style={{ width: 50, height: 50 }} />
    </View>
  );
};
// Make the component available to other parts of the App
export { SellerMenuHeader };
