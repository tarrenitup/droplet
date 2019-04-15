import PostsApi from '../api/PostsApi'
import * as types from './actionTypes'

/* Home posts */
export function loadHomePosts() {
    return function(dispatch) {
        return PostsApi.getPosts().then(homePosts => {
            dispatch(loadHomePostsSuccess(homePosts))
        }).catch(error => {
            throw(error)
        })
    }
}

export function loadHomePostsSuccess(homePosts) {
    return {type: types.LOAD_HOME_POSTS_SUCCESS, homePosts};
}

/* Map posts */
// TODO: Change getPosts to getMapPosts after setup
export function loadMapPosts(lng, lat, meters) {
    return function(dispatch) {
        return PostsApi.getMapPosts(lng, lat, meters).then(mapPosts => {
            dispatch(loadMapPostsSuccess(mapPosts))
        }).catch(error => {
            throw(error)
        })
    }
}

export function loadMapPostsSuccess(mapPosts) {
    return {type: types.LOAD_MAP_POSTS_SUCCESS, mapPosts};
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

export function newPostAddInitiate() {
    return { type: types.NEW_POST_ADD_INITIATE} 
}

export function sendNewPost(postData) {
    return function(dispatch) {
        return PostsApi.addNewPost(postData).then(() => {
            dispatch(newPostAddSuccess())
        }).catch(error => {
            throw(error)
        })
    }
}

export function newPostAddSuccess() {
    return { 
        type: types.NEW_POST_ADD_SUCCESS,
    }
}
