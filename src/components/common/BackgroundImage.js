/* Background image for all screens */
import React from 'react';
import { Image } from 'react-native';

const BackgroundImage = (props) => {
  return (
    <Image
      source={require('./images/BackgroundImg.jpg')}
      style={styles.backgroundStyle}
      resizeMode={Image.resizeMode.sretch}
    >
      {props.children}
    </Image>
  );
};

const styles = {
  backgroundStyle: {
    flex: 1,
    width: null,
    height: null
  }
};

export { BackgroundImage };
