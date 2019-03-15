import { combineReducers } from 'redux'  
import droplet from './postsReducer'

const rootReducer = combineReducers({  
  droplet: droplet
})

export default rootReducer;  