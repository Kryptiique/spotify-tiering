/**
 * This file defines all the Mutation queries we send to the GraphQL server.
 * All queries are structured to match the cases in which we will use them,
 * sending and returning the data as we need them per query. All GQL queries
 * must have at least one return value however, so even if we don't use the
 * result on the front end we still have retrieve something.
 * 
 * All parameters to the functions must be included when making the query.
 * You cannot send a request to the GQL server that takes in parameters
 * without first passing in the objects as query variables in the request.
 * 
 * NOTE: This may look like JSON format. It's not! It is the query language
 * that acts as a guideline for the JSON objects we will be receiving!
 */

/** Mutation query for when User creates a new circle!
 * @param {string} ownerID The id of the user creating the circle
 * @param {string} name The name of the circle being created
 * @param {string} description The description of the circle. Can be empty, but not undefined
 * @param {string} spotifyLink The link of the playlist on Spotify.
 * @param {string} image Link to an image of the circle. Can be the Spotify playlist image, or a separate one.
 * @param {bool} public Whether the playlist is visible to the public
 * @returns The id of the newly created Circle
*/
export const CreateCircle = 
`mutation CreateCircle(
  $ownerId: ID!
  $name:String!
  $description: String!
  $spotifyLink: String!
  $image:String!
  $public: Boolean!
){
  createCircle(
    ownerId: $ownerId
    name: $name
    description: $description
    spotifyLink: $spotifyLink
    image: $image
    public: $public
  ){
	 id
  }
}`

/**
 * Update the rating of the Song. Operation is only valid if either of the
 * following are true:
 * (1.) The current User is the Owner of the Circle
 * (2.) The current User is a member of the Circle and the Circle is marked
 * as `jointEffort`
 * @param {string} id The id of the Song that will be modified
 * @param {number} tier The new tier rating of the Song
 */
export const RateSong = 
`mutation RateSong(
  $id: ID!
  $tier: Int!
){
  updateSong(
    id: $id
    tier: $tier
  ){
    tier
    updatedAt
  }
}`

/**
 * Update the User's repuatation within the circle
 */
export const UpdateReputation = 
`mutation UpdateReputation(
	$id: ID!
  $reputation: Float!
  $userId: ID!
){
  updateUCLink(
		id: $id
    reputation: $reputation
    userId: $userId
  ){
		updatedAt
  }
}`

/**
 * Update the total reputation of the User. This Operation should not be
 * on the client side for security purposes.
 * @param {string} id Id of the User
 * @param {number} reputation The new value of the User's total reputation
 */
export const UpdateTotalReputation = 
`mutation UpdateTotalReputation(
  $id: ID!
  $reputation: Float!
){
  updateUser(
    id: $id
    reputation: $reputation
  ){
    updatedAt
  }
}`

/** Adds a User to Circle. Operation is only valid if either the current
 * User owns the Circle or the Circle is marked as public.
 * @param {string} circleId The id of the Circle to add the user to
 * @param {string} userId The id of the User being added
 * @returns the id of the UCLink that joins the User to the Circle
 */
export const AddUserToCircle =
`mutation AddOwnerToCircleUsers(
  $circleId:ID!
  $userId:ID!
){
	createUCLink(
    circleId: $circleId
    userId: $userId
  ) {
	  id
	}
}`

/**
 * Removes a User from the Circle by deleting the link between
 * them 
 * @param {string} id The id of the UCLink to 
 * @returns The id of the UCLink that was removed 
 */
export const RemoveUserFromCircle = 
`mutation RemoveUserFromCircle($id:ID!){
	deleteUCLink(id:$id){
    id
  }
}`

/**
 * Owner User relinquishes ownership to another User in the Circle.
 * Operation is only valid if the current User owns the Circle.
 * @param {string} id id of the Circle
 * @param {string} ownerId id of the User to be the new Owner
 * @returns The id of the new owner
 */
export const ChangeOwnership = 
`mutation ChangeOwnership(
  $id:ID!
  $ownerId: ID!
){
  updateCircle(
    $id: $id
    $ownerId: $ownerId
  ){
    owner{id}
  }
}`

/** 
 * User Adds a new song to the Circle's playlist. Operation is only valid if 
 * either of the following conditions are true:
 * (1.) The User is the Owner of the Circle
 * (2.) The User is a just a member of the Circle and the Circle is marked as
 * a `jointEffort`
 * @param {string} name Self explanatory
 * @param {string} album The name of the album
 * @param {string} albumArt The link to the image for the album cover on Spotify
 * @param {string} artist The list of artists on 
 * @param {string} spotifyLink The link to the Song on Spotify
 * @param {string} crlceId The id of the Circle to add the Song to
 * @param {string} adderId The id of the User adding the Song
 * @returns The id of the Song created
*/
export const CreateSong =
`mutation CreateSong(
  $album: String!
  $spotifyLink: String!
  $albumArt: String!
  $artist: String!
  $name: String!
  $circleId: ID!
  $adderId: ID!
){
  createSong(
    album: $album
    spotifyLink: $spotifyLink
    albumArt: $albumArt
    artist: $artist
    name: $name
    circleId: $circleId
    adderId: $adderId
  ){
    id
  }
}` 

/**
 * Utility function for updating count whenever a song was added to the playlist 
 * Has the same permissions as CreateSong
 * @param {string} id The id of the Circle whose playlist was modified
 * @param {number} songCount The new count of songs
 * @returns The new value of the songCount
 */
export const UpdateSongCount = 
`mutation UpdateSongCount(
    $id: String!
    $songCount: Integer!
  ){
  updateCircle(
    id: $id
    songCount: $songCount
  ){
    songCount
  }
}`

/**
 * User comments on a song.
 * Operation is only valid if the User belongs to the same Circle as the
 * Song
 * @param {string} userId The id of the User making the Comment
 * @param {string} songId The id of the Song on which the Comment was made
 * @param {string} text The text body of the Comment
 * @returns The id of the Comment that was created
 */
export const CommentOnSong = 
`mutation CommentOnSong(
  $userId: ID!
  $songId: ID!
  $text: String!
){
  createComment(
    userId: $userId
    songId: $songId
    text: $text
  ){
    id
  }
}`

/**
 * Modifies the text of the Comment. Operation is only valid if the
 * User is the author of the Comment.
 * @param {string} id The id of the Comment to modify
 * @param {string} newText The new value of the text body
 * @returns The new time when the comment was modified
 */
export const EditComment = 
`mutation EditComment(
  $id: ID!
  $newText: String!
){
  updateComment(
    id: $id
    text: $newText
  ) {
    updatedAt
  }
}`

/**
 * Deletes a Comment from the system. 
 * Operation is only valid if either of the following are true:
 * (1.) The current User is the author of the comment
 * (2.) The current User is the Owner of the Circle where the Song
 * on which the Comment belongs to
 * @param {string} id The id of the comment to delete
 */
export const DeleteComment = 
`mutation DeleteComment(
  $id: ID!
){
  deleteComment(
    $id: id
  )
}
`

/** 
 * User likes a song. Operation is only valid if the current User
 * belongs to the Circle to which the Song was added
 */
export const LikeSong =
`mutation LikeSong {
	createLike(
    $authorId: ID!
    $songId: ID!
  ){
    id
  }
}`

/**
 * Deletes a Like from the system. 
 * Operation is only valid if either of the following are true:
 * (1.) The current User is the author of the Like
 * (2.) The current User is the Owner of the Circle where the Song
 * on which the Like belongs to. This should only be possible if the
 * User is removing the Song.
 * @param {string} id The id of the comment to delete
 * @returns The id of the object removed
 */
export const UnlikeSong = 
`mutation DeleteLike( $id: ID! ){
  deleteLike( $id: id ){
    id
  }
}
`

/**
 * User requests a song to be swapped with another. Operation is
 * only valid if the User belongs to the Circle.
 * @param {string} authorId The User requesting the Swap
 * @param {string} circleId The Circle where the Songs will be
 * @param {string} originalSongId The Song that will be swapped
 * @param {string} replacementId The Song that will replace the original
 * @returns The id of the Swap that was created
 */
export const SwapSong =
`mutation SwapSong(
  $authorId: ID!
  $circleId: ID!
  $originalSongId: ID!
  $replacementId: ID!
){
  createSwap(
    authorId: $authorId
    circleId: $circleId
    originalSongId: $orginialSongId
    replacementId: $replacementId
  ){
    id
  }
}`

/**
 * Remove a Swap from the Circle's active Swaps. Operation is only valid
 * if the current User is the owner of the Circle
 * @param {string} id The id of the Swap to remove
 * @returns The id of the object removed
 */
export const RemoveSwap =
`mutation RemoveSwap($id: ID!){
  deleteSwap(id: $id){
    id
  }
}`

/** 
 * An action is performed, we need to propogate the addition to the 
 * entire site. Operation is not valid if the current User is a member
 * of the Circle
 * @param {string} image URL of the image denoting the notification/action
 * @param {string} link URL to the page where the User can see what the Action 
 * affected. Optional.
 * @param {string} authorId The id of the User who performed the Action
 * @param {string} circleId The id of the Circle the Action was performed in
 * @param {string} message A generated message describing the action performed
 * @param {ArrayLike} notificationUsersIds The ids of Users to send the
 * notification to. Typically will be all the Users in the Circle (excluding)
 * the owner
 */
export const PerformAction =
`mutation PerformAction(
  $image: ID
  $link: String
  $authorId: ID!
  $circleId: ID!
  $message: String!
  $notificationUsersIds: [ActionnotificationUsersUser!]!
){
  createAction(
    image: $image
    link: $link
    authorId: $authorId
    circleId: $circleId
    message: $message
    notificationUsersIds: $notificationUsersIds
  ){
    id
  }
}`

/**
 * User removes a notification from their inbox. Operation is only
 * valid if the current User was the one who received the notification.
 * @param {string} notificationUsersUserId The id of the User deleting the
 * notification
 * @param {string} notificationsActionId The id of the Action (notification)
 * to delete
 * @returns The id of the object that was deleted
 */
export const RemoveNotification = 
`mutation RemoveNotification(
  $notificationUsersUserId: ID!
  $notificationsActionId: ID!
){
  removeFromUserNotifications(
    notificationUsersUserId: $notificationUsersUserId
    notificationsActionId: $notificationsActionId
  ){
    notificationsAction {id}
  }
}`

/**
 * Create a message thread between two or more users.
 * @param {ArrayLike} userIds The list of users who will participate in 
 * the thread. Length should be >= 2.
 */
export const CreateThread = 
`mutation CreateThread(
  $userIds: [ID!]!
  ){
   createThread(
		usersIds: $userIds
  ){
		id
  }
}`

/**
 * Removes a User from a thread they are participating in. Operation is
 * only valid if the current User is in the Thread.
 * @param {string} userId The User to remove
 * @param {string} threadId The Thread to remove the User from
 * @returns Id of the deleted objects.
 */
export const RemoveUserFromThread = 
`mutation RemoveUserFromThread(
  $userId: ID!
  $threadId: ID!
){
  removeFromThreadOnUser(
    usersUserId: $userId
    threadsThreadId: $threadId
  ){
    threadsThread { id }
    usersUser { id }
  }
}`

/**
 * Create a message in a thread. Operation is not valid if the User is not
 * a current member of the Thread
 * @param {string} senderId The User sending the Message
 * @param {string} threadId The Thread to send the Message
 * @param {string} text The body of the Message
 */
export const CreateMessage =
`mutation CreateMessage(
  $senderId: ID!
  $threadId: ID!
  $text: String!
){
  createMessage(
    senderId: $senderId
    threadId: $threadId
    text: $text
  ){
    id
  }
}`

/**
 * Deletes a message.  Operation is not valid if the User is not
 * a current member of the Thread the Message belongs to.
 * @param {string} id The id of the Message to delete
 * @returns The id of the object deleted
 */
export const DeleteMessage = 
`mutation DeleteMessage($id: ID!){
  deleteMessage(id: $id){
    id
  }
}`

