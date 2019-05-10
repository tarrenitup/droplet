import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function timeReducer(state = initialState.time, action) {
  switch(action.type) {
    case types.UPDATE_TIME:
        return new Date()
    default:
        return state
    }
}
