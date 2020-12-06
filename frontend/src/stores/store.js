import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../reducers/userReducer';
import productReducer from '../reducers/productReducer';
import cartReducer from '../reducers/cartReducer';
import wishlistReducer from '../reducers/wishListReducer';
import orderReducer from '../reducers/orderReducer';
import categoryReducer from '../reducers/categoryReducer';
import unitReducer from '../reducers/unitReducer';

const reducer = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  order: orderReducer,
  category: categoryReducer,
  unit: unitReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));
export default store;
