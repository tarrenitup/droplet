import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function mapPostsReducer(state = initialState.allMapPosts, action) {
  switch(action.type) {
    case types.LOAD_ALL_MAP_POSTS_SUCCESS:
      return action.allMapPosts
    default:
      return state
  }
}
