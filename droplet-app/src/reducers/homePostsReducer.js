import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function homePostsReducer(state = initialState.homePosts, action) {
  switch(action.type) {
    case types.LOAD_HOME_POSTS_SUCCESS:
        return action.homePosts
    case types.ADD_LIKE_HOME:
        return state.map((post, index)=>{
            if(post._id === action.post._id){
                return action.post
            }
            return post
        })
    case types.ADD_COMMENT_HOME:
        return state.map((post,index)=>{
            if(post._id === action.post._id){
                return action.post
            }
            return post
        })
    case types.ADD_CLIKE_HOME:
        return state.map((post, index)=>{
            if(post._id === action.postid){
                let temp = post.comments.map((comment,index)=>{
                    if(comment._id === action.comment._id){
                        return action.comment
                    }
                    return comment
                })
                let newPost = Object.assign({},post)
                newPost.comments = temp
                return newPost
            }
            return post
        })
        /*
    case types.LIKE_SUCCESS_HOME:
        return state

        return state.map((post, index)=>{
            if(post._id === action.post._id){
                return action.post
            }
            return post
        })*/
    default:
        return state
  }
}
