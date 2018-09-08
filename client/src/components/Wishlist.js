import _ from 'lodash';
import React, { Component } from 'react';
import axios from 'axios';
import WishlistCard from '../components/WishlistCard'
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  Divider,
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../actions'

/**
 * cdm fetch 불필요
 */

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlist: [],
      name : false,
      date : true
    };
    this.nameSort = this.nameSort.bind(this);
    this.dateSort = this.dateSort.bind(this);
  }

  fetchWishlist() {
    axios.get('/api/wishlist').then(res => {
      this.setState({ wishlist: res.data });
      console.log(res.data);
    });
    this.props.fetchUser();
  }

  componentDidMount() {
    this.fetchWishlist();
  }

  onDeleteClick(id) {
    axios.delete(`/api/wishlist/${id}`).then(() => this.fetchWishlist());
  }

  buttonOff(){
    if(this.state.date){
      this.setState({
        date : false,
        name : true
      })
    }
    else{
      this.setState({
        date : true,
        name : false
      })
    }
  }

  nameSort() {
    this.setState(
      this.state.wishlist.sort((a,b)=>{
        if(a.productId.name > b.productId.name){
          return 1;
        }
        if(a.productId.name < b.productId.name){
          return -1;
        }
        return 0;
      })
    )
    this.buttonOff();
  }
  dateSort() {
    this.setState(
      this.state.wishlist.sort((a,b)=>{
        if(a.date > b.date){
          return -1;
        }
        if(a.date < b.date){
          return 1;
        }
        return 0;
      })
    )
    this.buttonOff();
  }

  renderSortButtons() {
    return (
      <div>
        <Button 
          variant="extendedFab" 
          onClick={()=>this.nameSort()} 
          disabled={this.state.name}>이름순</Button>
        <Button variant="extendedFab" 
          onClick={()=>this.dateSort()} 
          disabled={this.state.date}>날짜순</Button>
      </div>
    );
  }


  renderList() {
    return _.map(this.state.wishlist, item => {
      return (
        <Grid key = {item.productId._id} item lg={3} md={4} sm={6} xs={12}>
        <WishlistCard 
        key={item.productId._id} 
        product={item.productId} 
        onDelete = { id =>{
          this.onDeleteClick(id);
        }}/>
        </Grid>
      );
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <div className = {classes.container}>
        <div>
          <Typography
           className={classes.title}
           variant="title"
           component="h2"
           >Wishlist
           </Typography>
           <div className={classes.sortButton}>
            {this.renderSortButtons()}
           </div>
        </div>
          <Divider />
            <div>
              <Grid container spacing={8}>
                {this.renderList()}
              </Grid>
            </div>
      </div>
    );
  }
}

const styles = theme =>({
  container : {
    width : '100%',
    maxWidth : '1280px',
    margin : 'auto'
  },
  wishlistSection : {
    paddingTop : theme.spacing.unit*2,
    margin : 'center'
  },
  title : {
    marginTop : theme.spacing.unit *4,
    marginLeft : theme.spacing.unit
  },
  sortButton : {
    marginTop : theme.spacing.unit*2,
    marginBottom : theme.spacing.unit*2
  }
})

function mapStateToProps({ auth }) {
  return { auth };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    actions
  )(Wishlist)
)
