const Sequelize = require('sequelize')
const uuid = require('uuid/v4')

const db = new Sequelize('app_sql', null, null, {
  dialect: 'sqlite',
  storage: './app_sql.db',
})

const CircleModel = db.define('CricleModel', {
  id: {type: Sequelize.UUIDV4, primaryKey: true, defaultValue: uuid() },
})

const UserModel = db.define('UserModel', {
  id: {type: Sequelize.UUIDV4, primaryKey: true, defaultValue: uuid() },
})

const UCLinkModel = db.define('UCLinkModel', {
  id: {type: Sequelize.UUIDV4, primaryKey: true, defaultValue: uuid() },
})

const SongModel = db.define('SongModel', {
  id: {type: Sequelize.UUIDV4, primaryKey: true, defaultValue: uuid() },
})

const ActionModel = db.define('ActionModel', {
  id: {type: Sequelize.UUIDV4, primaryKey: true, defaultValue: uuid() },
})

const SwapModel = db.define('SwapModel', {
  id: {type: Sequelize.UUIDV4, primaryKey: true, defaultValue: uuid() },
})

const CommentModel = db.define('CommentModel', {
  id: {type: Sequelize.UUIDV4, primaryKey: true, defaultValue: uuid() },
})

const UTLinkModel = db.define('UTLinkModel', {
  id: {type: Sequelize.UUIDV4, primaryKey: true, defaultValue: uuid() },
})

const ThreadModel = db.define('UTLinkModel', {
  id: {type: Sequelize.UUIDV4, primaryKey: true, defaultValue: uuid() },
})

const MessageModel = db.define('MessageModel', {
  id: {type: Sequelize.UUIDV4, primaryKey: true, defaultValue: uuid() },
})

const models = {
  CircleModel,
  UserModel,
  UCLinkModel,
  SongModel,
  ActionModel,
  SwapModel,
  CommentModel,
  UTLinkModel,
  ThreadModel,
  MessageModel,
}

module.exports = models