import axios from 'axios';
import {
  FETCH_USER,
  DELETE_WISHLIST_ITEM,
  UPDATE_SEARCH,
  FETCH_SEARCH_ITEMS
} from './types';
// import * as types from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const deleteWishlistItem = id => async dispatch => {
  const res = await axios.delete(`/api/wishlist/${id}`);
  console.log(res.data);

  dispatch({ type: DELETE_WISHLIST_ITEM, payload: res.data });
};

export const updateSearch = search => dispatch => {
  dispatch({ type: UPDATE_SEARCH, payload: search });
};

export const fetchSearchItems = query => async dispatch => {
  console.log('검색요청:', query);
  const res = await axios.get('/api/search_result');

  dispatch({ type: FETCH_SEARCH_ITEMS, payload: res.data });
};
