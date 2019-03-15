import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function addPostReducer(state = initialState, action) {  
  switch(action.type) {
    case types.ADD_POSTS_SUCCESS:
      return action.posts
    default: 
      return state;
  }
}
