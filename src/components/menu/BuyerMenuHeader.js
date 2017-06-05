/* Customized buyer header component */
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../common/CommonCSS';

// Make a Component
const BuyerMenuHeader = ({ onPress, onCart }) => {
  const { hamStyle, headerStyle, logoStyle, cartStyle } = styles;
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
      <View style={{ width: 50, height: 50 }} >
        <TouchableOpacity onPress={onCart}>
        <Icon
          name='cart'
          size={20}
          backgroundColor='#00fff'
          style={cartStyle}
        />
        </TouchableOpacity>
      </View>
    </View>
  );
};
// Make the component available to other parts of the App
export { BuyerMenuHeader };
