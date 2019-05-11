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

export function sendNewPost(postData,pageIndex,userID) {
    return function(dispatch) {
        return PostsApi.addNewPost(postData,userID)
        .then(() => {
            switch(pageIndex){
                case 0:
                    dispatch(loadHomePosts());
                    break;
                case 1:
                    dispatch(loadMapPosts());
                    break;
                //Don't have to handle 2 since you'll never have a like on
                //a post you just made
                case 3:
                    dispatch(loadProfilePosts(userID));
                    break;
                default:
                    dispatch(reloadAllPosts(userID));
                    break;
            }
            dispatch(newPostAddSuccess());
        })
        .catch(error => {
            throw(error)
        })
    }
}

//Upon add new post, update respective post arrays
export function newPostAddSuccess() {
    return {
        type: types.NEW_POST_ADD_SUCCESS,
    }
}

export function loadProfilePosts(userID){
    return function(dispatch){
        return PostsApi.getUserPosts(userID)
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

export function loadYourLikedPosts(userID){
    return function(dispatch){
        return PostsApi.getYourLikedPosts(userID)
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

export function likePost(post,pageIndex){
    switch(pageIndex){
        case 0:
            return {type:types.ADD_LIKE_HOME,post}
        case 1:
            return {type:types.ADD_LIKE_MAP,post}
        case 2:
            return {type:types.ADD_LIKE_LIKE,post}
        case 3:
            return {type:types.ADD_LIKE_PROFILE,post}
        default:
            return
    }
}
/*
//Reloads a page's posts to update like.
//Obsolete - swapped with above. Database update done thru card.
export function likePostUpdate(postID,pageIndex){
    return function(dispatch){
        return PostsApi.addLike(postID)
        .then(post=>{
            dispatch(likeSuccess(post,pageIndex));
            //dispatch(reloadAllPosts());
        }).catch(error =>{
            throw(error)
        })
    }
}

export function likeSuccess(post,pageIndex){
    switch(pageIndex){
        case 0:
            return {type:types.LIKE_SUCCESS_HOME,post}
        case 1:
            return {type:types.LIKE_SUCCESS_MAP,post}
        case 2:
            return {type:types.LIKE_SUCCESS_LIKE,post}
        case 3:
            return {type:types.LIKE_SUCCESS_PROFILE,post}
        default:
            return
    }
    //return{type:types.LIKE_SUCCESS,post,pageIndex}
}
*/

export function reloadAllPosts(userID){
    return function(dispatch){
        dispatch(loadHomePosts());
        dispatch(loadMapPosts());
        dispatch(loadProfilePosts(userID));
        dispatch(loadYourLikedPosts(userID));
    }
}
