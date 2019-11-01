const Sequelize = require('sequelize')
const uuid = require('uuid/v4')

const db = new Sequelize('app_sql', null, null, {
  dialect: 'sqlite',
  storage: './app_sql.db',
})

/**
 * This file essentially models the objects as they should appear on the
 * SQLite database.
 */

const CircleModel = db.define('CricleModel', {
  id: { type: Sequelize.UUIDV4, primaryKey: true, defaultValue: uuid() },
  __typename: { type: Sequelize.STRING, defaultValue: 'Circle' },
  createdAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  updatedAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  songCount: { type: Sequelize.INTEGER },
  ownerId: { type: Sequelize.STRING },
  image: { type: Sequelize.STRING },
  spotifyLink: { type: Sequelize.STRING },
  swapCap: { type: Sequelize.INTEGER },
  addCap: { type: Sequelize.INTEGER },
  initialAddCap: { type: Sequelize.INTEGER },
  frozen: { type: Sequelize.INTEGER },
  autoFreeze: { type: Sequelize.INTEGER },
  freezeSettings: { type: Sequelize.STRING },
  joinLink: { type: Sequelize.STRING },
  jointEffort: { type: Sequelize.INTEGER },
})

const UserModel = db.define('UserModel', {
  id: { type: Sequelize.UUIDV4, primaryKey: true, defaultValue: uuid() },
  __typename: { type: Sequelize.STRING, defaultValue: 'User' },
  createdAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  updatedAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  
  username: { type: Sequelize.STRING, allowNull: false },
  profilePic: { type: Sequelize.STRING },
  reputation: { type: Sequelize.NUMBER },
  spotifyLink: { type: Sequelize.STRING, allowNull: false },
  active: { type: Sequelize.INTEGER},
  displayName: { type: Sequelize.STRING, allowNull: false },
  sortCategory: { type: Sequelize.STRING, allowNull: false },
  sortDirection: { type: Sequelize.STRING, allowNull: false },
})

const UCLinkModel = db.define('UCLinkModel', {
  id: { type: Sequelize.UUIDV4, primaryKey: true, defaultValue: uuid() },
  __typename: { type: Sequelize.STRING, defaultValue: 'UCLink' },
  createdAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  updatedAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  
  linkCircleId: { type: Sequelize.STRING, allowNull: false },
  linkUserId: { type: Sequelize.STRING, allowNull: false },
  displayName: { type: Sequelize.STRING, allowNull: false },
  reputation: { type: Sequelize.NUMBER },
})

const SongModel = db.define('SongModel', {
  id: { type: Sequelize.UUIDV4, primaryKey: true, defaultValue: uuid() },
  __typename: { type: Sequelize.STRING, defaultValue: 'Song' },
  createdAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  updatedAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  
  circleId: { type: Sequelize.STRING, allowNull: false },
  removeId: { type: Sequelize.STRING, allowNull: false },
  adderId: { type: Sequelize.STRING, allowNull: false },
  artist: { type: Sequelize.STRING, allowNull: false },
  album: { type: Sequelize.STRING, allowNull: false },
  albumArt: { type: Sequelize.STRING, allowNull: false },
  dateAdded: { type: Sequelize.STRING, allowNull: false },
  tier: { type: Sequelize.INTEGER},
  spotifyLink: { type: Sequelize.STRING, allowNull: false },
})

const ActionModel = db.define('ActionModel', {
  id: { type: Sequelize.UUIDV4, primaryKey: true, defaultValue: uuid() },
  __typename: { type: Sequelize.STRING, defaultValue: 'Action' },
  createdAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  updatedAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  
  ownerId: { type: Sequelize.STRING, allowNull: false },
  circleId: { type: Sequelize.STRING, allowNull: false },
  image: { type: Sequelize.STRING, allowNull: false },
  message: { type: Sequelize.STRING, allowNull: false },
  link: { type: Sequelize.STRING, allowNull: false },
  date: { type: Sequelize.STRING, allowNull: false },
})

const SwapModel = db.define('SwapModel', {
  id: { type: Sequelize.UUIDV4, primaryKey: true, defaultValue: uuid() },
  __typename: { type: Sequelize.STRING, defaultValue: 'Swap' },
  createdAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  updatedAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  
  authorId: { type: Sequelize.STRING, allowNull: false },
  circleId: { type: Sequelize.STRING, allowNull: false },
  date: { type: Sequelize.STRING, allowNull: false },
  originalId: { type: Sequelize.STRING, allowNull: false },
  replacementId: { type: Sequelize.STRING, allowNull: false },
})

const CommentModel = db.define('CommentModel', {
  id: { type: Sequelize.UUIDV4, primaryKey: true, defaultValue: uuid() },
  __typename: { type: Sequelize.STRING, defaultValue: 'Comment' },
  createdAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  updatedAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  
  authorId: { type: Sequelize.STRING, allowNull: false },
  songId: { type: Sequelize.STRING, allowNull: false },
  date: { type: Sequelize.STRING, allowNull: false },
  body: { type: Sequelize.STRING, allowNull: false },
})

const UTLinkModel = db.define('UTLinkModel', {
  id: { type: Sequelize.UUIDV4, primaryKey: true, defaultValue: uuid() },
  __typename: { type: Sequelize.STRING, defaultValue: 'UTLink' },
  createdAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  updatedAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  
  userId: { type: Sequelize.STRING, allowNull: false },
  threadId: { type: Sequelize.STRING, allowNull: false },
})

const ThreadModel = db.define('ThreadModel', {
  id: { type: Sequelize.UUIDV4, primaryKey: true, defaultValue: uuid() },
  __typename: { type: Sequelize.STRING, defaultValue: 'Thread' },
  createdAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  updatedAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
})

const MessageModel = db.define('MessageModel', {
  id: { type: Sequelize.UUIDV4, primaryKey: true, defaultValue: uuid() },
  __typename: { type: Sequelize.STRING, defaultValue: 'Message' },
  createdAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  updatedAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  
  threadId: { type: Sequelize.STRING, allowNull: false },
  senderId: { type: Sequelize.STRING, allowNull: false },
  dateSent: { type: Sequelize.STRING, allowNull: false },
})

const LikeModel = db.define('LikeModel', {
  id: { type: Sequelize.UUIDV4, primaryKey: true, defaultValue: uuid() },
  __typename: { type: Sequelize.STRING, defaultValue: 'Like' },
  createdAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  updatedAt: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  
  songId: { type: Sequelize.STRING, allowNull: false },
  userId: { type: Sequelize.STRING, allowNull: false },
})

/**
 * Now that the models have been defined, we can now use Sequelize to define
 * object relationships through the fields we created. These relationships
 * are equivalent to 1:M and M:M, and allow us to more generally resolve objects
 * through GQL
 */

CircleModel.belongsToMany(UserModel, {
  through: UCLinkModel, as: 'Users', foreignKey: 'linkCircleId' 
})
CircleModel.hasOne(UserModel, {through: UCLinkModel, as: 'Owner', foreignKey: 'linkCircleId'})
CircleModel.hasMany(SongModel, {as: 'Playlist', foreignKey: 'circleId'})
CircleModel.hasMany(SongModel, {as: 'Removed', foreignKey: 'removedId'})
CircleModel.hasMany(SwapModel, {as: 'Swaps', foreignKey: 'circleId'})
CircleModel.hasMany(ActionModel, {as: 'History', foreignKey:'circleId'})

UserModel.belongsToMany(UserModel, {
  through: UCLinkModel, as: 'Circles', foreignKey: 'linkUserId' 
})
UserModel.belongsToMany(ThreadModel, {
  through: UTLinkModel, as:'Threads', foreignKey: 'userId'
})
UserModel.hasMany(ActionModel, {as: 'Notifications', foreignKey: 'notificationUserId'})

UCLinkModel.belongsTo(UserModel, {foreignKey: 'linkUserId', targetKey: 'id'})
UCLinkModel.belongsTo(CircleModel, {foreignKey: 'linkCircleId', targetKey: 'id'})

SongModel.belongsTo(CircleModel, {foreignKey: 'circleId', targetKey: 'id'})
SongModel.hasMany(CommentModel, {as: 'Comments', foreignKey: 'songId'})
SongModel.belongsTo(UserModel, {as: 'Adder', foreignKey: 'adderId'})
SongModel.hasMany(LikeModel, {as: 'Likes', foreignKey: 'songId'})

ActionModel.belongsTo(CircleModel, {foreignKey: 'circleId', targetKey: 'id'})
ActionModel.belongsTo(UserModel, {as: 'Owner', foreignKey: 'ownerId'})

SwapModel.belongsTo(CircleModel, {foreignKey: 'circleId', targetKey: 'id'})
SwapModel.belongsTo(UserModel, {as: 'Author', foreignKey: 'authorId'})
SwapModel.belongsTo(SongModel, {as: 'Original', foreignKey: 'originalId'})
SwapModel.belongsTo(SongModel, {as: 'Replacement', foreignKey: 'replacementId'})

CommentModel.belongsTo(SongModel, {foreignKey: 'songId', targetKey: 'id'})
CommentModel.belongsTo(UserModel, {as: 'Author', foreignKey: 'authorId'})

UTLinkModel.belongsTo(UserModel, {foreignKey: 'userId', targetKey: 'id'})
UTLinkModel.belongsTo(ThreadModel, {foreignKey: 'threadId', targetKey: 'id'})

ThreadModel.belongsToMany(UserModel, {
  through: UTLinkModel, as: 'Users', foreignKey: 'threadId'
})
ThreadModel.hasMany(MessageModel, {as: 'Messages', foreignKey: 'threadId'})

MessageModel.belongsTo(ThreadModel, {as:'Thread', foreignKey: 'threadId'})
MessageModel.belongsTo(UserModel, {as:'Sender', foreignKey:'senderId'})

LikeModel.belongsTo(SongModel, {as: 'Song', foreignKey:'songId'})
LikeModel.belongsTo(UserModel, {as: 'User', foreignKey:'userId'})


const models = {
  Circle:   CircleModel,
  User:     UserModel,
  UCLink:   UCLinkModel,
  Song:     SongModel,
  Action:   ActionModel,
  Swap:     SwapModel,
  Comment:  CommentModel,
  UTLink:   UTLinkModel,
  Thread:   ThreadModel,
  Message:  MessageModel,
  Like:     LikeModel,
}

module.exports = models