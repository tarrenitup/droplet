import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function locationReducer(state = initialState.location, action) {
  switch(action.type) {
    case types.UPDATE_LOCATION:
      return action.location
    default:
      return state;
  }
}
