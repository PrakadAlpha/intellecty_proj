import axios from 'axios';
import {GET_TRANSACTIONS, TRANSACTION_ERROR, ADD_TRANSACTION} from '../types';

export const getTransactions = _ => {
  return async (dispatch) => { 
      const config = {header: {'Content-Type': 'application/json'}}  
      try {
          const res = await axios.get('/api/transactions', config)
          console.log(res.data);                 
          dispatch({type: GET_TRANSACTIONS, payload: res.data})
      } catch (err) {
        dispatch({type: TRANSACTION_ERROR, payload: err.response.message});
      }  
  }
}

export const addTransaction = transaction => {
  return async (dispatch) => { 
      const config = {header: {'Content-Type': 'application/json'}}  
      try {
        console.log(transaction);
          const res = await axios.post('/api/transactions', {...transaction, status: transaction._status}, config)
          console.log(res.data);                 
          dispatch({type: ADD_TRANSACTION, payload: res.data})
      } catch (err) {
        dispatch({type: TRANSACTION_ERROR, payload: err.response.message});
      }  
  }
}
