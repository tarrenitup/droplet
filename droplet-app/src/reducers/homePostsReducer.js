import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function homePostsReducer(state = initialState.homePosts, action) {
  switch(action.type) {
    case types.LOAD_HOME_POSTS_SUCCESS:
      return action.homePosts
    default: 
      return state
  }
}
