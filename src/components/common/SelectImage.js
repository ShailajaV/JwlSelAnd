/* Select image from */
import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
//import $ from 'jquery';

export function selectPic(callback) {
    ImagePicker.showImagePicker({}, (response) => {
    if (response.didCancel) {
      console.log('User cancelled photo picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      let source;
      if (Platform.OS === 'android') {
        source = { uri: response.uri };
      } else {
        source = { uri: response.uri.replace('file://', '') };
      }
      return source;
    }
  });
  callback.apply(null, []);
}
