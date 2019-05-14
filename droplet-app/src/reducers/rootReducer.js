import { combineReducers } from 'redux'
import homePostsReducer from './homePostsReducer'
import newPostModalReducer from './newPostModalReducer'
import overlayReducer from './overlayReducer'
import mapPostsReducer from './mapPostsReducer'
import loginReducer from './loginReducer'
import currentPageReducer from './currentPageReducer'

const rootReducer = combineReducers({
  overlay: overlayReducer,
  homePosts: homePostsReducer,
  newPostModal: newPostModalReducer,
  mapPosts: mapPostsReducer,
  login: loginReducer,
  selectedPageIndex: currentPageReducer,
})

export default rootReducer;
