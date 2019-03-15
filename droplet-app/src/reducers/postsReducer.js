import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function postsReducer(state = initialState, action) {  
  switch(action.type) {
    case types.LOAD_POSTS_SUCCESS:
      const blah = Object.assign({}, state, {
        pages: state.pages.map((page, index) => {
          if(index === 0) {
            return Object.assign({}, {
              name: 'home',
              posts: action.posts,
            })
          } else {
            return state.page
          }
        }) 
      })
      
      return blah
    default: 
      return state
  }
}
