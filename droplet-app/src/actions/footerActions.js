import PostsApi from '../api/PostsApi'
import * as types from './actionTypes'

/* Home posts */
export function changePageIndex(pageIndex) {
    return { type: types.CHANGE_CURRENT_PAGE, pageIndex: pageIndex }
}
