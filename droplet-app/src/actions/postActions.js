import PostsApi from '../api/PostsApi'
import * as types from './actionTypes'

/* GET */
export function loadPosts() { 
    return function(dispatch) {
        return PostsApi.getSamplePosts().then(posts => { //switch back to getPosts (sample for testing only.)
            dispatch(loadPostsSuccess(posts))
        }).catch(error => {
            throw(error)
        })
    }
}

export function loadPostsSuccess(posts) {
    return {type: types.LOAD_POSTS_SUCCESS, posts};
}



/* POST */
export function addPost() {
    return function(dispatch) {
        return PostsApi.addNewPost().then(success => {
            dispatch(addPostSuccess(success))
        }).catch(error => {
            throw(error)
        })
    }
}

export function addPostSuccess(success) {
    return {type: types.ADD_POSTS_SUCCESS, success};
}
