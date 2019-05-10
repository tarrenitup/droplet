import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function profileReducer(state = initialState.likedPosts, action) {
  switch(action.type) {
    case types.LOAD_YOUR_LIKED_POSTS:
        return action.likedPosts
    default:
        return state
  }
}
