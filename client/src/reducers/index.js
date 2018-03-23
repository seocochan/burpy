import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import searchResultReducer from './searchResultReducer';

export default combineReducers({
  auth: authReducer,
  searchResult: searchResultReducer,
  form: formReducer
});
