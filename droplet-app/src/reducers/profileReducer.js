import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function profileReducer(state = initialState.profile, action) {
  switch(action.type) {
    case types.LOAD_PROFILE_POSTS:
        return {
            ...state,
            posts: action.userPosts,
        }
    case types.LOGIN_DATA:
        return{
            ...state,
            username: action.name,
            userid: action.id
        }
    case types.LOAD_BIO:
        return{
            ...state,
            bio: action.bio
        }
    case types.ADD_LIKE_PROFILE:
        return{
            ...state,
            posts: state.posts.map((post, index)=>{
                if(post._id === action.post._id){
                    return action.post
                }
                return post
            })
        }
    case types.ADD_COMMENT_PROFILE:
        return{
            ...state,
            posts: state.posts.map((post,index)=>{
                if(post._id === action.post._id){
                    return action.post
                }
                return post
            })
        }
    case types.ADD_CLIKE_PROFILE:
        return {
            ...state,
            posts: state.posts.map((post, index)=>{
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
    }
    default:
        return state
  }
}
