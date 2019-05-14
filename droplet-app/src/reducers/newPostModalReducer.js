import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function newPostModalReducer(state = initialState.newPostModal, action) {
  switch(action.type) {
    case types.TOGGLE_NEW_POST_MODAL:
        return {
          ...state,
          visible: !state.visible,
        }
    case types.CHANGE_SPLASH_RANGE:
        return {
          ...state,
          splashRangeIndex: action.splashRangeIndex,
        }
    case types.CHANGE_NEW_POST_TYPE:
        return {
          ...state,
          postTypeIndex: action.postTypeIndex,
        }
    case types.NEW_POST_ADD_SUCCESS:
        return {
            ...state,
            visible: false
        }
    case types.LOGIN_DATA:
        return {
            ...state,
            username: action.name
        }
    default:
      return state
  }
}
