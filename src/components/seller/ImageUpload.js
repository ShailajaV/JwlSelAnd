import React, { Component } from 'react';
import { Card, CardSection, Button } from '../common';

class ImageUpload extends Component {

  handleChangeImage(evt) {
    console.log('Uploading');
    const self = this;
    const reader = new FileReader();
    const file = evt.target.files[0];

    reader.onload = function (upload) {
        self.setState({
            image: upload.target.result
        });
    };

    reader.readAsDataURL(file);
    setTimeout(() => {
  console.log(self.state.image);
}, 1000);
    console.log(this.state.image);
    console.log('Uploaded');
}
  render() {
    return (
      <Card>
      <CardSection>

      <Button onPress={this.handleChangeImage}>
        Upload
      </Button>
      </CardSection>
      </Card>
    );
  }
}

export default ImageUpload;
