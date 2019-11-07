/** Populating the list of Circles a user is apart of.
 * Minimal Filter object must contain the id of the user
 * @param {*} filter
 * @returns A list of Circle objects
 */
export const GetUsersCircles = `query GetUsersCircles(
  $filter: UserFilter!
) {
  allUsers(filter: $filter) {
    circles{
      reputation
      circle {
        name
        owner {
          id
          displayName
          spotifyLink
          profilePic
        }
        description
        joinLink
        songCount
        image
        spotifyLink
      }
    }
  }
}`

/** 
 * Query Users part of a given Circle.
 * Minimal filter object must contain the id of the circle
 * @param {*} filter a filter to apply, matching the the structure of the Circle
 * @return A list of users
 */
export const GetCircleUsers = `query GetCircleUsers($filter:CircleFilter!){
  allCircles(filter: $filter){
    users{
      reputation
      user {
        id
        displayName
        spotifyLink
        profilePic
      }
    }
  }
}`

/** Query for browsing for all circles. 
 * Should use the `findCirclesFilter` object.
 * @see findCirclesFilter
 * @param {*} filter the filter to be applied. The structure of
 * the object matches the structure for the Circle object.
 * @param {string} orderBy The order by which to order the results. 
 * The value must be in this form: `[field_name]_[ASC/DESC]`
 * @param {number} skip The index at which to start (for pagination)
 * @param {number} last The last index to receive (for pagination)
 * @returns The list of Circles that match the query
*/
export const FindCircles = `
query FindCircles(
  $filter: CircleFilter!
  orderBy: CircleOrderBy
  skip: Int
  last: Int
){
  allCircles(
    filter: $filter
    orderBy: $orderBy 
    skip: $skip
    last: $last
  ) {
    id
    name
    description
    users{
      id
    }
    playlist {
      id
    }
  }
}`

/** 
 * Query for specific song
 * @param {*} filter the filter to be applied. The structure of
 * the object matches the structure for the Song object.
 * @param {string} orderBy The order by which to order the results. 
 * The value must be in this form: `[field_name]_[ASC/DESC]`
 * @param {number} skip The index at which to start (for pagination)
 * @param {number} last The last index to receive (for pagination)
 */
export const GetSong = `
query GetSong(
  $filter: SongFilter!
  orderBy: SongOrderBy
  skip: Int
  last: Int
){
  allSongs(
    filter: $filter 
    orderBy: $orderBy 
    skip: $skip
    last: $last
  ){
    id
    name
    album
    albumArt
    tier
    createdAt
    adder {
      id
      displayName
      spotifyLink
      profilePic
    }
#   TODO: Subscribe
    comments {
      user {
        id
        displayName
        spotifyLink
        profilePic
      }
      text
      createdAt
      updatedAt
    }
#   TODO: Subscribe
    likes{
      id
    }
  }
}`

/**
 * Retrieving a single or list of users from the database. The amount
 * is determined by whether a Unique field is used in the filter.
 * Operation is only valid for logged in Users.
 */
export const GetUser = 
`query GetUser(
  $filter: UserFilter!
){
  allUsers(filter: $filter){
    id
    username
    displayName
    reputation
    profilePic
    spotifyLink
  }
}`

/**
 * Retrieves the link between a User and a Circle.
 * @param {string} filter.userId The id of the User 
 * @param {string} filter.circleId The id of the Circle
 */
export const GetUserLink = 
`query GetUserLink(
  $filter: UCLinkFilter!
){
  allUCLinks(
    filter: $filter
  ){
    id
    user { id }
    circle { id }
  }
}`

export const GetUserSongs =
`query GetUserSongsInCircle(
  $filter: SongFilter
){
  allSongs(filter: $filter){
  	id
    tier
	}
}`