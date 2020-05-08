import { combineReducers } from 'redux'
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import customerReducer from './customerReducer';
import transactionReducer from './transactionReducer';
import productReducer from './productReducer';


export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  customer: customerReducer,
  product: productReducer,
  transaction: transactionReducer
});