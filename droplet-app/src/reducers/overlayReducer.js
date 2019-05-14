import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function overlayReducer(state = initialState.overlay, action) {
  switch(action.type) {
    case types.TOGGLE_NEW_POST_MODAL:
        return !state
    case types.NEW_POST_ADD_INITIATE:
        return true
    case types.NEW_POST_ADD_SUCCESS:
        return false
    default:
        return state
  }
}
