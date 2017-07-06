/* wire all the reducers with the combineReducers */
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import SellerFormReducer from './SellerFormReducer';
import ProductReducer from './ProductReducer';
import ProductsListReducer from './ProductsListReducer';
import BuyerProductReducer from './BuyerProductReducer';
import ChatReducer from './ChatReducer';
import CartReducer from './CartReducer';
import PaymentReducer from './PaymentReducer';
import OrderReducer from './OrderReducer';

export default combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  sellerForm: SellerFormReducer,
  productForm: ProductReducer,
  products: ProductsListReducer,
  buyerProductForm: BuyerProductReducer,
  chatForm: ChatReducer,
  cartForm: CartReducer,
  payment: PaymentReducer,
  order: OrderReducer
});
