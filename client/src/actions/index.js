import axios from 'axios';
import { FETCH_USER, DELETE_WISHLIST_ITEM } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const deleteWishlistItem = id => async dispatch => {
  const res = await axios.delete(`/api/wishlist/${id}`);
  console.log(res.data);

  dispatch({ type: DELETE_WISHLIST_ITEM, payload: res.data });
};
