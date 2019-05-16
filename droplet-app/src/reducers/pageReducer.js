import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function pageReducer(state = initialState.selectedPageIndex, action) {
  switch(action.type) {
    case types.HOME_PAGE:
        return 0
    case types.MAP_PAGE:
        return 1
    case types.LIKE_PAGE:
        return 2
    case types.PROFILE_PAGE:
        return 3
    default:
        return state
    }
}
