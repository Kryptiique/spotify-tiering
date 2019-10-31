import * as actions from './actionTypes'
import { initialState } from '../../../shared/constants'
import _ from 'lodash'

/**
 * @param {*} state A portion of the redux store for the page
 * @param {*} action the action that was dispatched, containing the type of action and its arguments
 */
export default function browseReducer(state = initialState.page, action) {
  var newState = _.cloneDeep(state)

  switch(action.type) {
    default:
      return newState;
  }
}