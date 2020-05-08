import {GET_PRODUCTS, ADD_PRODUCT, PRODUCT_ERROR, DELETE_PRODUCT, SET_CURRENT, CLEAR_CURRENT, UPDATE_PRODUCT } from '../types'
import axios from 'axios';

export const getProducts = _ => {
    return async (dispatch) => { 
        const config = {header: {'Content-Type': 'application/json'}}  
        try {
            const res = await axios.get('/api/products', config)
            console.log(res.data);                 
            dispatch({type: GET_PRODUCTS, payload: res.data})
        } catch (err) {
          dispatch({type: PRODUCT_ERROR, payload: err.response.message});
        }  
    }
  }

  export const addProducts = product => {
    return async (dispatch) => { 
        const config = {header: {'Content-Type': 'application/json'}}  
        try {
            const res = await axios.post('/api/products', product, config)
            console.log(res.data);                 
            dispatch({type: ADD_PRODUCT, payload: res.data});
        } catch (err) {
            console.log(err.response)
            dispatch({type: PRODUCT_ERROR, payload: err.response.message});
        }  
    }
  }

 export const updateProducts = product => {
  
    return async dispatch => {

        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };

        try {
          const res = await axios.put(`/api/products/${product._id}`,product,config);

          dispatch({type: UPDATE_PRODUCT, payload: res.data});
        } catch (err) {
          dispatch({type: PRODUCT_ERROR, payload: err.response.message});
        }
    }  
  }

  export const deleteProduct = product => {
    return async dispatch => {
      try {
        await axios.delete(`/api/products/${product}`);
        dispatch({type: DELETE_PRODUCT,payload: product});
      } catch (err) {
        dispatch({type: PRODUCT_ERROR, payload: err.response.message});
      }  
    }
  }

  export const setCurrent = product => {
    return async dispatch => {
    dispatch({type: SET_CURRENT, payload: product});
    }
  }

  export const clearCurrent = _ => {
    return async dispatch => {
        dispatch({type: CLEAR_CURRENT});
    }
  }