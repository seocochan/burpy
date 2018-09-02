import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import { Star, StarBorder } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Snackbar
} from '@material-ui/core';
import noImage from '../assets/images/noImage.png';
import { connect } from 'react-redux';
import axios from 'axios';

class ProductCard extends Component {
  constructor(props){
    super(props);
    this.state = {isToggleOn : null, open : false};
    this.handleClick = this.handleClick.bind(this,this.props.product._id)
    this.currentState = null;
  }
  componentWillMount(){
    this.fetchList();
  }

  componentDidMount(){
    this.fetchList();
  }

  async handleClick(id) {
    const { isToggleOn } = this.state;
    this.currentState = isToggleOn;
    await this.setState({ isToggleOn: null });

    if (this.currentState) {
      await axios.post(`/api/wishlist/${id}`);
      this.setState({ isToggleOn: !this.currentState });
    } else {
      await axios.delete(`/api/wishlist/${id}`);
      this.fetchList();
      this.setState({ isToggleOn: !this.currentState });
    }

    this.setState({ open: true });
  }

  fetchList(){
    if(this.props.auth.wishlist !==[]){
      for(let i = 0; i < this.props.auth.wishlist.length; i++){
        if(this.props.auth.wishlist[i].productId === this.props.product._id){
          this.setState({isToggleOn : false});
          break;
        }
      }
    }
    if(this.state.isToggleOn == null){
      this.setState({isToggleOn : true});
    }
  }

  renderSnackBar() {
    const { open } = this.state;

    return (
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={() => this.setState({ open: false })}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">찜목록에 추가!</span>}
      />
    );
  }

  render() {
    const { classes } = this.props;
    const { _id: id, name, category, avgScore, imageUrl } = this.props.product;
    const {isToggleOn} = this.state;
    const s3Url = 'https://s3.ap-northeast-2.amazonaws.com/burpy-app/';
    console.log(id);
    console.log(this.props.auth.wishlist[0].productId)

    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={imageUrl ? s3Url + imageUrl : noImage}
            title={name}
            component={Link}
            to={`/product/${id}`}
          />
          <div className={classes.contentContainer}>
            <CardContent className={classes.content}>
              <Typography variant="caption" component="p">
                {category}
              </Typography>
              <Typography
                className={classes.name}
                gutterBottom
                variant="title"
                component="h3"
              >
                {name}
              </Typography>
              <Rating
                readonly
                initialRating={parseFloat(avgScore)}
                fullSymbol={
                  <Star className={classes.starIcon} nativeColor="#ffda00" />
                }
                emptySymbol={
                  <StarBorder
                    className={classes.starIcon}
                    nativeColor="#ffed87"
                  />
                }
              />
            </CardContent>
            <CardActions className={classes.actions}>
              <Button size="small" color="primary" disabled={!isToggleOn} onClick={this.handleClick}>
                찜
              </Button>
              {this.renderSnackBar()}
              <Button
                variant="flat"
                size="small"
                component={Link}
                to={`/product/${id}`}
              >
                더보기
              </Button>
            </CardActions>
          </div>
        </Card>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    maxHeight: 160,
    margin: theme.spacing.unit
  },
  card: {
    display: 'flex'
  },
  media: {
    width: '33.333333%'
  },
  contentContainer: {
    width: '66.666666%',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  name: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%'
  },
  starIcon: {
    fontSize: 16
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: theme.spacing.unit
  }
});

function mapStateToProps({ auth }) {
  return { auth };
}

export default withStyles(styles)(
  connect(
    mapStateToProps
  )(ProductCard)
)
