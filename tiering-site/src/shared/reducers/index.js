import { combineReducers } from 'redux'

// Sub-reducers
import userReducer from './user/user'

/**
 * A Redux reducer for the entire site.
 * It is largely split by the individual pages.
 */
const rootReducer = combineReducers({
  user: userReducer
})

export default rootReducer;
