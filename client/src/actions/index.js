import axios from 'axios';
import { FETCH_USER, UPDATE_SEARCH, FETCH_SEARCH_ITEMS } from './types';
// import * as types from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateSearch = search => dispatch => {
  dispatch({ type: UPDATE_SEARCH, payload: search });
};

export const fetchSearchItems = items => dispatch => {
  dispatch({ type: FETCH_SEARCH_ITEMS, payload: items });
};
