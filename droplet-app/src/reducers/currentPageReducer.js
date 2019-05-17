import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function currentPageReducer(state = initialState.selectedPageIndex, action) {
  switch(action.type) {
    case types.CHANGE_CURRENT_PAGE:
      return {
        ...state,
        selectedPageIndex: action.pageIndex,
      }
    default:
      return state;
  }
}
