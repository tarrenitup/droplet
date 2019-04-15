import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.profile, action) {
    switch(action.type){
         case types.LOGIN_SUCCESS:
            return {
                ...state,
                username: action.loginUsername,
                posts: action.loginPosts
            }
        default:
            return state;
    }
}
