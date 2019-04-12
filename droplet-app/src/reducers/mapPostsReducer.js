import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function mapPostsReducer(state = initialState.mapPosts, action) {
  switch(action.type) {
    case types.LOAD_MAP_POSTS_SUCCESS:
      return action.mapPosts
    default:
      return state
  }
}
