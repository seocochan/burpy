import React, { Component, Fragment } from 'react';

class ImageUploader extends Component {
  state = {
    file: null,
    imagePreviewUrl: null
  };

  onFileChange(event) {
    event.preventDefault();

    const reader = new FileReader();
    const file = event.target.files[0];
    this.props.watchFile(file);

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const { imagePreviewUrl } = this.state;

    return (
      <Fragment>
        <input
          onChange={this.onFileChange.bind(this)}
          type="file"
          accept="image/*"
        />
        {imagePreviewUrl && <img src={imagePreviewUrl} width="300px" />}
      </Fragment>
    );
  }
}

export default ImageUploader;
