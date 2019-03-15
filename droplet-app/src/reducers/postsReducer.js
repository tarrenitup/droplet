import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function postsReducer(state = initialState.pages[0].posts, action) {  
  switch(action.type) {
    case types.LOAD_POSTS_SUCCESS:
      return action.posts
    default: 
      return state;
  }
}