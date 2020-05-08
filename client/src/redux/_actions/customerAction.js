import {GET_CUSTOMERS, ADD_CUSTOMER, CUSTOMER_ERROR, DELETE_CUSTOMER, SET_CURRENT, CLEAR_CURRENT, UPDATE_CUSTOMER } from '../types'
import axios from 'axios';

export const getCustomers = _ => {
    return async (dispatch) => { 
        const config = {header: {'Content-Type': 'application/json'}}  
        try {
            const res = await axios.get('/api/customers', config)
            console.log(res.data);                 
            dispatch({type: GET_CUSTOMERS, payload: res.data})
        } catch (err) {
          dispatch({type: CUSTOMER_ERROR, payload: err.response.message});
        }  
    }
  }

  export const addCustomers = customer => {
    return async (dispatch) => { 
        const config = {header: {'Content-Type': 'application/json'}}  
        try {
            const res = await axios.post('/api/customers', customer, config)
            console.log(res.data);                 
            dispatch({type: ADD_CUSTOMER, payload: res.data});
        } catch (err) {
            console.log(err.response)
            dispatch({type: CUSTOMER_ERROR, payload: err.response.message});
        }  
    }
  }

 export const updateCustomers = customer => {
  
    return async dispatch => {

        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };

        try {
          const res = await axios.put(`/api/customers/${customer._id}`,customer,config);

          dispatch({type: UPDATE_CUSTOMER,payload: res.data});
        } catch (err) {
          dispatch({type: CUSTOMER_ERROR,payload: err.response.message});
        }
    }  
  }

  export const deleteCustomer = customer => {
    return async dispatch => {
      try {
        await axios.delete(`/api/customers/${customer}`);
        dispatch({type: DELETE_CUSTOMER,payload: customer});
      } catch (err) {
        dispatch({type: CUSTOMER_ERROR, payload: err.response.message});
      }  
    }
  }

  export const setCurrent = customer => {
    return async dispatch => {
    dispatch({type: SET_CURRENT, payload: customer});
    }
  }

  export const clearCurrent = _ => {
    return async dispatch => {
        dispatch({type: CLEAR_CURRENT});
    }
  }