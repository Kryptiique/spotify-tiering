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
    console.debug(res)
    return res.data.createUser
  }).catch(err => {
    console.error(err)
    return undefined
  })
}