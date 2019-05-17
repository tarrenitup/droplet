import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function themeReducer(state = initialState.themeId, action) {
  switch(action.type) {
    case types.TOGGLE_THEME:
        return !state
    default:
        return state
  }
}
