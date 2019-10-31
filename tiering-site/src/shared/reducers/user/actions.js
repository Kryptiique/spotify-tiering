import * as actions from './actionTypes'

/**
 * This file and the many like it define the structure for methods that modify
 * data stored in the site's Redux Store. If you want to use them, you
 * either have to connect them to a View using a dispatch connector, or
 * pass them to child components from a component that already has access to them
 */

/**
 * Logs a user in and stores their import 
 * @param {*} user 
 */
export const loginUser = user => ({
  user,
  type: actions.LOGIN_USER
})

/**
 * Updates the access token to a Spotify account to a user
 * @param {string} newToken 
 */
export const refreshToken = newToken => ({
  newToken,
  type: actions.REFRESH_TOKEN
})