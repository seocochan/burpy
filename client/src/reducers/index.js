import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import searchReducer from './searchReducer';
import searchResultReducer from './searchResultReducer';

export default combineReducers({
  auth: authReducer,
  search: searchReducer,
  searchResult: searchResultReducer,
  form: formReducer
});
