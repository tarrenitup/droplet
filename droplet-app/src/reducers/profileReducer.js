import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function profileReducer(state = initialState.profile, action) {
  switch(action.type) {
    case types.LOAD_PROFILE_POSTS:
        return {
            ...state,
            posts: action.userPosts,
        }
        /*
        return Object.assign({}, state, {
            posts: action.userPosts
        })
        */
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
    default:
        return state
  }
}
