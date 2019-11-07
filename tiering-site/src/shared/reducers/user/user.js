import _ from 'lodash'

import * as actions from './actionTypes'
import { initialState } from '../../constants'


/**
 * The reducer for user information
 * @param {*} state 
 * @param {*} action 
 */
export default function userReducer(state = initialState.user, action) {
  
  var newState = _.cloneDeep(state)

  switch(action.type){
    case actions.LOGIN_USER:
      newState = Object.assign (newState, action.user)
      return newState

    case actions.REFRESH_TOKEN:
      newState.token = action.newToken
      return newState
    default:
      return state
  }

}