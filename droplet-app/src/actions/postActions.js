import PostsApi from '../api/PostsApi'
import * as types from './actionTypes'

/* GET */
export function loadHomePosts() { 
    return function(dispatch) {
        return PostsApi.getSamplePosts().then(homePosts => { // switch back to getPosts (sample for testing only.)
            dispatch(loadHomePostsSuccess(homePosts))
        }).catch(error => {
            throw(error)
        })
    }
}

export function loadHomePostsSuccess(homePosts) {
    return {type: types.LOAD_HOME_POSTS_SUCCESS, homePosts};
}



/* POST */
// export function addPost() {
//     return function(dispatch) {
//         return PostsApi.addNewPost().then(success => {
//             dispatch(addPostSuccess(success))
//         }).catch(error => {
//             throw(error)
//         })
//     }
// }

// export function addPostSuccess(success) {
//     return {type: types.ADD_POST_SUCCESS, success}
// }

export function toggleNewPostModal() {
    return { type: types.TOGGLE_NEW_POST_MODAL }
}
