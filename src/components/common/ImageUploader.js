/* Uploading an image */
import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import { bindAll } from 'lodash';
import $ from 'jquery';

class ImageUploader extends Component {

  constructor() {
    super();
    this.state = {
      data_uri: null,
      processing: false
    };

    bindAll(this, 'handleFile', 'handleSubmit');
  }

  handleSubmit(e) {
    e.preventDefault();
    const currentThis = this;

    this.setState({
      processing: true
    });

    const promise = $.ajax({
      url: '/api/v1/image',
      type: 'POST',
      data: {
        data_uri: this.state.data_uri,
        filename: this.state.filename,
        filetype: this.state.filetype
      },
      dataType: 'json'
    });

    promise.done = function (data) {
      currentThis.setState({
        processing: false,
        uploaded_uri: data.uri
      });
    };
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let processing;
    let uploaded;

    if (this.state.uploaded_uri) {
      uploaded = (
        <div>
          <h4>Image uploaded!</h4>
          <Image className='image-preview' src={this.state.uploaded_uri} />
          <pre className='image-link-box'>{this.state.uploaded_uri}</pre>
        </div>
      );
    }

    if (this.state.processing) {
      processing = 'Processing image, hang tight';
    }

    return (
      <div className='row'>
        <div className='col-sm-12'>
          <Text>Upload an image</Text>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <input type="file" onChange={this.handleFile} />
            <input
              disabled={this.state.processing} className='btn btn-primary'
              type="submit" value="Upload"
            />
            {processing}
          </form>
          {uploaded}
        </div>
      </div>
    );
  }
}

export default ImageUploader;
