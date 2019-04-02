import PostsApi from '../api/PostsApi'
import * as types from './actionTypes'

/* Home posts */
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



/* New post actions */
export function toggleNewPostModal() {
    return { type: types.TOGGLE_NEW_POST_MODAL }
}

export function changeSplashRange(splashRangeIndex) {
    return {
        type: types.CHANGE_SPLASH_RANGE,
        splashRangeIndex, 
    }
}

export function changeNewPostType(postTypeIndex) {
    return {
        type: types.CHANGE_NEW_POST_TYPE,
        postTypeIndex,
    }
}
