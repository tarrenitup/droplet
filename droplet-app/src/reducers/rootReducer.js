import { combineReducers } from 'redux'
import homePostsReducer from './homePostsReducer'
import newPostModalReducer from './newPostModalReducer'
import overlayReducer from './overlayReducer'
import mapPostsReducer from './mapPostsReducer'
import themeReducer from './headerReducer'
import currentPageReducer from './currentPageReducer'
import profileReducer from './profileReducer'
import likesReducer from './likesReducer'
import pageReducer from './pageReducer'
import locationReducer from './locationReducer'
import timeReducer from './timeReducer'

const rootReducer = combineReducers({
  overlay: overlayReducer,
  homePosts: homePostsReducer,
  newPostModal: newPostModalReducer,
  mapPosts: mapPostsReducer,
  themeId: themeReducer,
  selectedPageIndex: currentPageReducer,
  profile: profileReducer,
  likedPosts: likesReducer,
  selectedPageIndex: pageReducer,
  location: locationReducer,
  time: timeReducer
})

export default rootReducer;
