import { FETCH_SEARCH_ITEMS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SEARCH_ITEMS:
      return action.payload;
    default:
      return state;
  }
}