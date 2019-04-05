import { combineReducers } from 'redux'  
import homePostsReducer from './homePostsReducer'
import newPostModalReducer from './newPostModalReducer'
import overlayReducer from './overlayReducer'


const rootReducer = combineReducers({
  overlay: overlayReducer,
  homePosts: homePostsReducer,
  newPostModal: newPostModalReducer,
})

export default rootReducer;  