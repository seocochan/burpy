import React, { Component, Fragment } from 'react';

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imagePreviewUrl: null
    };

    this.s3Url = 'https://s3.ap-northeast-2.amazonaws.com/burpy-app/';
  }

  componentWillReceiveProps(nextProps) {
    const { imageUrl } = nextProps;
    
    // props로 기존에 등록된 이미지 url이 있는 경우 프리뷰 출력
    if (this.props.imageUrl !== imageUrl) {
      this.setState({ imagePreviewUrl: this.s3Url + imageUrl });
    }
  }

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
