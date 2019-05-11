import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function profileReducer(state = initialState.likedPosts, action) {
  switch(action.type) {
    case types.LOAD_YOUR_LIKED_POSTS:
        return action.likedPosts
    case types.ADD_LIKE_LIKE:
        return state.map((post, index)=>{
            if(post._id === action.post._id){
                return action.post
            }
            return post
        })
    case types.ADD_COMMENT_LIKE:
        return state.map((post,index)=>{
            if(post._id === action.post._id){
                return action.post
            }
            return post
        })
    case types.ADD_CLIKE_LIKE:
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
    default:
        return state
  }
}
