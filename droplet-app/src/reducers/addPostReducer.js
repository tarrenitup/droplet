import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function newPostAddSuccess(state = initialState, action) {  
  switch(action.type) {
    case types.NEW_POST_ADD_SUCCESS:
      return action.posts
    default: 
      return state;
  }
}
