/* wire all the reducers with the combineReducers */
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SellerReducer from './SellerReducer';
import SellerFormReducer from './SellerFormReducer';

export default combineReducers({
  auth: AuthReducer,
  seller: SellerReducer,
  sellerForm: SellerFormReducer
});
