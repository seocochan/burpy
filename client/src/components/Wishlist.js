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
 * TODO:
 * cdm fetch 불필요 xx 필요함 이거안하면 wishlist 못받아옴
 * 나머진 수정 완료
 */

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlist: [],
      sort : 'name',
      open : false
    };

    this.sortChange = this.sortChange.bind(this);
  }

  fetchWishlist() {
    axios.get('/api/wishlist').then(res => {
      const sorted = res.data.concat().sort((a,b)=>{
        if(a.date > b.date){
          return -1;
        }
        if(a.date < b.date){
          return 1;
        }
        return 0;
      })
      this.setState({wishlist : sorted, open : false, sort : 'name'});
      console.log(this.state.wishlist);
    });
    this.props.fetchUser();
  }

  componentDidMount() {
    this.fetchWishlist();
  }

  onDeleteClick(id) {
    axios.delete(`/api/wishlist/${id}`).then(() => this.fetchWishlist());
  }

  sortChange(){
    if(this.state.sort =='date'){
      const sorted = this.state.wishlist.concat().sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        }
        if (a.date < b.date) {
          return 1;
        }
        return 0;
      });
      this.setState({ wishlist : sorted, sort : 'name', open : false});
    }
    else if(this.state.sort =='name'){
      const sorted = this.state.wishlist.concat().sort((a, b) => {
        if (a.productId.name > b.productId.name) {
          return 1;
        }
        if (a.productId.name < b.productId.name) {
          return -1;
        }
        return 0;
      });
      this.setState({ wishlist : sorted, sort : 'date', open : true});
    }
  }
  renderSortButtons() {
    return (
      <div>
        <Button 
          variant="extendedFab" 
          onClick={()=>this.sortChange()} 
          disabled={this.state.open}>이름순</Button>
        <Button variant="extendedFab" 
          onClick={()=>this.sortChange()} 
          disabled={!this.state.open}>날짜순</Button>
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
    console.log(this.state.wishlist)
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
