import {ADD_CUSTOMER, GET_CUSTOMERS, DELETE_CUSTOMER, CUSTOMER_ERROR, CLEAR_CURRENT, SET_CURRENT, UPDATE_CUSTOMER} from '../types'

const initState = {
    customers: null,
    current: null,
    error: null,
    loading: true
}

const custReducer = (state = initState, action) => {
  switch(action.type){
    case GET_CUSTOMERS:
      return {
        ...state, 
        customers: action.payload,
        loading: false
      }
    case ADD_CUSTOMER:
      return {
        ...state, 
        customers: [...state.customers, action.payload],
        loading: false
      }
    case DELETE_CUSTOMER:
      return {
        ...state, 
        customers:state.customers.filter(cust => cust._id !== action.payload),
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
    case UPDATE_CUSTOMER:
      return {
        ...state, 
        customers: state.customers.map(cust =>
          cust._id === action.payload._id ? action.payload: cust)
      }

    case CUSTOMER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }     
}

export default custReducer;