/* wire all the reducers with the combineReducers */
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import SellerFormReducer from './SellerFormReducer';
import ProductReducer from './ProductReducer';
import ProductsListReducer from './ProductsListReducer';
import buyerProductReducer from './BuyerProductReducer';
import ChatReducer from './ChatReducer';

export default combineReducers({
  auth: AuthReducer,
  users: UserReducer,
  sellerForm: SellerFormReducer,
  productForm: ProductReducer,
  products: ProductsListReducer,
  buyerProductForm: buyerProductReducer,
  chatForm: ChatReducer
});
