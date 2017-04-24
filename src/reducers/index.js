/* wire all the reducers with the combineReducers */
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SellerReducer from './SellerReducer';
import SellerFormReducer from './SellerFormReducer';
import ProductReducer from './ProductReducer';
import ProductsListReducer from './ProductsListReducer';
import buyerProductReducer from './BuyerProductReducer';

export default combineReducers({
  auth: AuthReducer,
  sellers: SellerReducer,
  sellerForm: SellerFormReducer,
  productForm: ProductReducer,
  products: ProductsListReducer,
  buyerProductForm: buyerProductReducer
});
