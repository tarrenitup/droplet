import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function profileReducer(state = initialState.profile, action) {
  switch(action.type) {
    case types.LOAD_PROFILE_POSTS:
        return {
            ...state,
            posts: action.userPosts,
        }
    case types.LOGIN_SUCCESS:
        return {
            ...state,
            username: action.name,
        }
    case types.LOAD_BIO:
        return{
            ...state,
            bio: action.bio
        }
    case types.ADD_LIKE_PROFILE:
        return{
            ...state,
            posts: state.posts.map((post, index)=>{
                if(post._id === action.post._id){
                    return action.post
                }
                return post
            })
        }
    default:
        return state
  }
}
