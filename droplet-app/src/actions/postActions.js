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
        return PostsApi.addNewPost(postData)
        //.then(() => {
            //Waits 4 minutes for some reason?
            //dispatch(loadProfilePosts())
            //dispatch(newPostAddSuccess())
        .catch(error => {
            throw(error)
        })
    }
}

export function loadProfilePosts(){
    return function(dispatch){
        return PostsApi.getUserPosts()
        .then(response =>{
            dispatch(loadUserPostsSuccess(response))
        }).catch(error =>{
            throw(error)
        })
    }
}

export function loadUserPostsSuccess(userPosts) {
    return {type: types.LOAD_PROFILE_POSTS, userPosts};
}

export function loadYourLikedPosts(){
    return function(dispatch){
        return PostsApi.getYourLikedPosts()
        .then(posts =>{
            dispatch(loadYourLikedPostsSuccess(posts))
        }).catch(error =>{
            throw(error)
        })
    }
}

export function loadYourLikedPostsSuccess(likedPosts){
    return{ type: types.LOAD_YOUR_LIKED_POSTS, likedPosts};
}

export function likePost(postID){
    return function(dispatch){
        return PostsApi.addLike(postID)
        .then(()=>{
            dispatch(reloadAllPosts());
        }).catch(error =>{
            throw(error)
        })
    }
}

export function reloadAllPosts(){
    return function(dispatch){
        dispatch(loadHomePosts());
        dispatch(loadMapPosts());
        dispatch(loadProfilePosts());
        dispatch(loadYourLikedPosts());
    }
}


//Upon add new post, update respective post arrays
export function newPostAddSuccess() {
    return {
        type: types.NEW_POST_ADD_SUCCESS,
    }
}
