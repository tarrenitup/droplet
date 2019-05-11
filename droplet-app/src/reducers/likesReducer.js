import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function profileReducer(state = initialState.likedPosts, action) {
  switch(action.type) {
    case types.LOAD_YOUR_LIKED_POSTS:
        return action.likedPosts
    case types.ADD_LIKE_LIKE:
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
