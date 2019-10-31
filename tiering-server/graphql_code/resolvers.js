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
} = require('./models')

const Sequelize = require('sequelize')
const { Op } = Sequelize
const defaultLimit = '25'

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
      where[column] = {[Op[key]]: filter[column][key]}
    })
  })
  return where
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
    // getUser(_, req){ return User.findOne({ where: req }) },
    // listUser(_, req){ return listFunc(Comment, req, defaultLimit) },
  }
}

// export default resolvers
module.exports = resolvers