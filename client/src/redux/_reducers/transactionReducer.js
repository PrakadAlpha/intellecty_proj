import {GET_TRANSACTIONS, TRANSACTION_ERROR} from '../types'

const initState = {
    transactions: null,
    error: null,
    loading: true
}

const transReducer = (state = initState, action) => {

  switch(action.type){
    case GET_TRANSACTIONS:
      return {
        ...state, 
        transactions: action.payload,
        loading: false
      }

    case TRANSACTION_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export default transReducer;
