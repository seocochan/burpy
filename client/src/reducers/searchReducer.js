import { UPDATE_SEARCH } from '../actions/types';

export default function(state = '', action) {
  switch (action.type) {
    case UPDATE_SEARCH:
      return action.payload;
    default:
      return state;
  }
}