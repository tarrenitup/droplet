import PostsApi from '../api/PostsApi'
import * as types from './actionTypes'

/* Home posts */
export function toggleTheme() {
    return { type: types.TOGGLE_THEME }
}
