import {ADD_PRODUCT, GET_PRODUCTS, DELETE_PRODUCT, PRODUCT_ERROR, CLEAR_CURRENT, SET_CURRENT, UPDATE_PRODUCT} from '../types'

const initState = {
    products: null,
    current: null,
    error: null,
    loading: true
}

const prodReducer = (state = initState, action) => {
  switch(action.type){
    case GET_PRODUCTS:
      return {
        ...state, 
        products: action.payload,
        loading: false
      }
    case ADD_PRODUCT:
      return {
        ...state, 
        products: [...state.products, action.payload],
        loading: false
      }
    case DELETE_PRODUCT:
      return {
        ...state, 
        products:state.products.filter(prod => prod._id !== action.payload),
        loading: false
      }
    case SET_CURRENT:
      return {
        ...state, 
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state, 
        current: null
      }   
    case UPDATE_PRODUCT:
      return {
        ...state, 
        products: state.products.map(prod =>
          prod._id === action.payload._id ? action.payload: prod)
      }
    case PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }     
}

export default prodReducer;