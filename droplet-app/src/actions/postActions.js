import PostsApi from '../api/PostsApi'
import * as types from './actionTypes'

export function loadPosts() { 
    return function(dispatch) {
        return PostsApi.getPosts().then(posts => {
            dispatch(loadPostsSuccess(posts))
        }).catch(error => {
            throw(error)
        })
    }
}

export function loadPostsSuccess(posts) {
    return {type: types.LOAD_POSTS_SUCCESS, posts};
}
