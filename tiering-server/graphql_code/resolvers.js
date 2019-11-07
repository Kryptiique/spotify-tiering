const { PubSub } =  require('graphql-subscriptions')
const {
  Circle,
  User,
  UCLink,
  Song,
  Action,
  Swap,
  Comment,
  UTLink,
  Thread,
  Message,
  Like,
} = require('./models')

const Sequelize = require('sequelize')
const { Op } = Sequelize
const defaultLimit = '25'

const SOMETHING_UPDATED = 'something_updated';
const SOMETHING_CREATED = 'something_created';
const SOMETHING_REMOVED = 'something_removed';
const pubsub = new PubSub();

/**
 * Helper function that allows objects to be filtered through a
 * standardized way
 * @param {*} filter The filter as it is received from the request
 */
function processFilter(filter){
  if (filter===null) return {}

  const where = {}
  Object.keys(filter).forEach(column => {
    Object.keys(filter[column]).forEach(key => {
      // This isn't entirely what we want
      where[column] = { [Op[key]]: filter[column][key] }
    })
  })
  return where
}

/**
 * Converts a date object into a human readable format
 * of the form MM/DD/YYYY HH:MM:SS.MS
 * @param {Date} date 
 */
function readableDate(date){
  return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`
}

/**
 * Helper function that allows one to update the values of a record
 * @param {*} Table The table in which to update a record
 * @param {*} req The request recieved
 * @returns The Promise resulting in the record with its new value
 */
function updateFunc(Table, req){
  const id = l.cloneDeep(req.input.id)
  delete req.input.id

  const where = {where: {id}}
  const args = {}
  Object.keys(req.input).forEach(key => {
    args[key] = req.input[key]
  })

  return Table.update(args, where).then(_ => {
    return Table.findOne(where)
  })
}

/** 
 * Helper function for finding a list of values
 * @param {*} Table The table to search in
 * @param {*} req The request received
 * @param {string} min The minimum limit value if not specified in req. 
 * Can be null to represent no limit.
 * @returns The Promise that evaluates to the query's result
 */
function listFunc(Table, req, min){
  const limit = req.limit ? req.limit : min
  var nextToken = req.nextToken ? parseInt(req.nextToken) : 0
  const filter = req.filter ? req.filter : null

  return Table.findAll({where: processFilter(filter),
    limit: limit, offset: nextToken}).then(items => {

    // Set nextToken to the size of the limit
    if(limit !== null){
      nextToken = items.length < parseInt(limit)? null : nextToken + parseInt(limit)
    }
    return {items: items, nextToken: '' + nextToken}
 })
}

/**
 * Helper function to delete a record from the table
 * @param {*} Table The table to delete the record from
 * @param {*} req The request that contains parameters for what to delete
 * @returns The original record removed from the table
 */
function deleteFunc (Table, req){
  return Table.findOne({where: req.input}).then(res => {
    return Table.destroy({ where: req.input }).then(_ => {
      return res
    }) 
  })
}

/**
 * Functions for converting queries into data
 */
const resolvers = {
  Query: {
    // Singular Retrievals
    getCircle(_, req){ return Circle.findOne({ where: req }) },
    getUser(_, req){ return User.findOne({ where: req }) },
    getUCLink(_, req){ return UCLink.findOne({ where: req }) },
    getSong(_, req){ return Song.findOne({ where: req }) },
    getAction(_, req){ return Action.findOne({ where: req }) },
    getSwap(_, req){ return Swap.findOne({ where: req }) },
    getComment(_, req){ return Comment.findOne({ where: req }) },
    getUTLink(_, req){ return UTLink.findOne({ where: req }) },
    getThread(_, req){ return Thread.findOne({ where: req }) },
    getMessage(_, req){ return Message.findOne({ where: req }) },

    // List retrievals
    listCircles(_, req){ return listFunc(Circle, req, defaultLimit) },
    listUsers(_, req){ return listFunc(User, req, defaultLimit) },
    listUCLinks(_, req){ return listFunc(UCLink, req, defaultLimit) },
    listSongs(_, req){ return listFunc(Song, req, defaultLimit) },
    listActions(_, req){ return listFunc(Action, req, defaultLimit) },
    listSwaps(_, req){ return listFunc(Swap, req, defaultLimit) },
    listComments(_, req){ return listFunc(Comment, req, defaultLimit) },
    listUTLinks(_, req){ return listFunc(UTLink, req, defaultLimit) },
    listThreads(_, req){ return listFunc(Thread, req, defaultLimit) },
    listMessages(_, req){ return listFunc(Message, req, defaultLimit) },
    listLikes(_, req){ return listFunc(Like, req, defaultLimit) },
  },
  Mutation: {
    // Creations
    createCircle(_, req){ return Circle.create(req.input) },
    createUser(_, req){ return User.create(req.input) },
    createUCLink(_, req){ return UCLink.create(req.input) },
    createSong(_, req){ return Song.create(req.input) },
    createAction(_, req){ return Action.create(req.input) },
    createSwap(_, req){ return Swap.create(req.input) },
    createComment(_, req){ return Comment.create(req.input) },
    createUTLink(_, req){ return UTLink.create(req.input) },
    createThread(_, req){ return Thread.create(req.input) },
    createMessage(_, req){ return Message.create(req.input) },
    createLike(_, req){ return Like.create(req.input) },

    // Updates
    updateCircle(_, req){ return updateFunc(Circle, req) },
    updateUser(_, req){ return updateFunc(User, req) },
    updateUCLink(_, req){ return updateFunc(UCLink, req) },
    updateSong(_, req){ return updateFunc(Song, req) },
    updateAction(_, req){ return updateFunc(Action, req) },
    // updateSwap(_, req){ return updateFunc(Swap, req) },
    updateComment(_, req){ return updateFunc(Comment, req) },
    // updateUTLink(_, req){ return updateFunc(UTLink, req) },
    // updateThread(_, req){ return updateFunc(Thread, req) },
    updateMessage(_, req){ return updateFunc(Message, req) },

    // Deletions
    deleteCircle(_, req){ return deleteFunc(Circle, req) },
    deleteUser(_, req){ return deleteFunc(User, req) },
    deleteUCLink(_, req){ return deleteFunc(UCLink, req) },
    deleteSong(_, req){ return deleteFunc(Song, req) },
    deleteSwap(_, req){ return deleteFunc(Swap, req) },
    deleteAction(_, req){ return deleteFunc(Action, req) },
    deleteComment(_, req){ return deleteFunc(Comment, req) },
    deleteUTLink(_, req){ return deleteFunc(UTLink, req) },
    deleteThread(_, req){ return deleteFunc(Thread, req) },
    deleteMessage(_, req){ return deleteFunc(Message, req) },
    deleteLike(_, req){ return deleteFunc(Like, req) },
  },
  Subscription: {
    somethingChanged: {
      subscribe: () => pubsub.asyncIterator([ SOMETHING_UPDATED, SOMETHING_CREATED, SOMETHING_REMOVED ]),
    },
  },
  Circle: {
    playlist(circle) {
      return circle.getPlaylist().then(items => {
        return { items: items }
      })
    },
    removed(circle) {
      return circle.getRemoved().then(items => {
        return { items: items }
      })
    },
    owner(circle) {
      return circle.getOwner()
    },
    users(circle) {
      return circle.getUsers().then(items => {
        return { items: items }
      })
    },
    swaps(circle) {
      return circle.getSwaps().then(items => {
        return { items: items }
      })
    },
    history(circle) {
      return circle.getHistory().then(items => {
        return { items: items }
      })
    },
  },
  User: {
    circles(user) {
      return user.getCircles().then(items => {
        return { items: items }
      })
    },
    threads(user) {
      return user.getThreads().then(items => {
        return { items: items }
      })
    },
    notifications(user) {
      return user.getNotifications().then(items => {
        return { items: items }
      })
    },
  },
  UCLink: {
    user(link) {
      return link.User()
    },
    circle(link) {
      // console.debug(link)
      return link.Circle
    },
  },
  Song: {
    adder(song) {
      return song.getAdder()
    },
    circle(song) {
      return song.getCircle()
    },
    comments(song) {
      return song.getComments().then(items => {
        return { items: items }
      })
    },
    likes(song) {
      return song.getLikes().then(items => {
        return { items: items }
      })
    },
  },
  Action: {
    circle(action) {
      return action.getCircle()
    },
    owner(action) {
      return action.getOwner()
    },
  },
  Swap: {
    author(swap) {
      return swap.getAuthor()
    },
    circle(swap) {
      return swap.getCircle()
    },
    original(swap) {
      return swap.getOriginal()
    },
    replacement(swap) {
      return swap.getReplacement()
    },
  },
  Comment: {
    author(comment) {
      return comment.getAuthor()
    },
    song(comment) {
      return comment.getSong()
    },
  },
  UTLink: {
    user(link) {
      return link.getUser()
    },
    thread(link) {
      return link.getThread()
    },
  },
  Thread: {
    users(thread){
      return thread.getUsers().then(items => {
        return {items: items}
      })
    },
    messages(thread){
      return thread.getMessages().then(items => {
        return {items: items}
      })
    },
  },
  Message: {
    thread(message) {
      return message.getThread()
    },
    sender(message) {
      return message.getSender()
    },
  },
  Like: {
    user(like) {
      return like.getUser()
    },
    song(like) {
      return like.getSong()
    },
  },
}

// export default resolvers
module.exports = resolvers