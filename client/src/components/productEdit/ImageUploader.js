import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { AddAPhoto } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import noImage from '../../assets/images/noImage.png';

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
    const { classes } = this.props;
    const { imagePreviewUrl } = this.state;

    return (
      <div className={classes.container}>
        <input
          className={classes.input}
          onChange={this.onFileChange.bind(this)}
          id="image-upload"
          type="file"
          accept="image/*"
        />
        <label htmlFor="image-upload">
          <Button
            variant="outlined"
            size="small"
            component="span"
            className={classes.button}
          >
            <AddAPhoto className={classes.icon} />
            이미지 등록
          </Button>
        </label>
        <img
          className={classes.image}
          height="240px"
          src={imagePreviewUrl || noImage}
        />
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    width: '100%',
    maxWidth: 320
  },
  image: {
    alignSelf: 'center'
  },
  button: {
    marginBottom: theme.spacing.unit
  },
  input: {
    display: 'none'
  },
  icon: {
    marginRight: theme.spacing.unit
  }
});

export default withStyles(styles)(ImageUploader);
