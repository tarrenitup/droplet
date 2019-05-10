import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function homePostsReducer(state = initialState.homePosts, action) {
  switch(action.type) {
    case types.LOAD_HOME_POSTS_SUCCESS:
        return action.homePosts
    case types.LIKE_SUCCESS_HOME:
        return state.map((post, index)=>{
            if(post._id === action.post._id){
                return action.post
            }
            return post
        })
    default:
        return state
  }
}
