import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function spinnerReducer(state = initialState.loadingSpinner, action) { 
  switch(action.type) {
    case types.NEW_POST_ADD_INITIATE:
        return true
    case types.NEW_POST_ADD_SUCCESS:
        return false
    default: 
        return state
  }
}
