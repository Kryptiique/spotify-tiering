import gqlReq, { gql } from './API'

/**
 * This file contains operations we use to interact with the GraphQL
 * API. It abstracts the responses we get from the server and returns
 * only the things we care about when we invoke the operations.
 */


/**
 * Determines if a User exists in our database.
 * @param {string} username 
 * @returns The user object in the database. Undefined if the User does not exist.
 */
export async function userExists (username) {
  return await gqlReq( gql.queries.GetUser, gql.filters.userExists(username) ).then(res => { 
    if(res.data.allUsers.length === 0) return undefined
    return res.data.allUsers[0]
  }).catch(err => {
    console.error(err)
    return undefined
  })
}

/**
 * Retrieves a user by the given id. Result is undefined if there is no User with that
 * id in the database
 * @param {string} id 
 */
export async function getUser(id) {
  return await gqlReq( gql.queries.GetUser, gql.filters.userIdFilter(id) ).then(res => {
    if(res.data.allUsers.length === 0) return undefined
    return res.data.allUsers[0]
  })
}

/** 
 * Creates a User in the database.
 * @param {*} user The user object to create. Must be unique.
 * @returns The id of the new User. Undefined if the User was unable to be
 * created.
 */
export async function createUser (user) {
  return await gqlReq( gql.mutations.AddUser, user).then(res => {
    return res.data.createUser
  }).catch(err => {
    console.error(err)
    return undefined
  })
}

/**
 * Checks if a Circle exists in the database with the given name. Circle names must be
 * unique, so if this returns true you should not attempt to make a new one with that
 * name. ;)
 * @param {string} name
 */
export async function circleExists(name){
  return await gqlReq( gql.getCircle, {
    filter: {
      name
    }
  }).then(res => {
    console.debug(res)
    if(res.data.allCircles.length === 0) return undefined
    return res.data.allCircles[0]
  }).catch(error => {
    console.error(error)
    return undefined
  })
}

/**
 * Create a new circle in the database. 
 * @param {*} circle 
 * @returns Returns the id of the circle that was created if no error occured.
 * Otherwise returns undefined.
 */
export async function createCircle(circle){
  return await gqlReq( gql.mutations.CreateCircle, circle).then(res => {
    console.debug(res)
    return res.data.createCircle
  }).catch(err => {
    console.error(err)
    return undefined
  })
}