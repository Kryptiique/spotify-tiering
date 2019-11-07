import { graphqlOperation } from 'aws-amplify'
import axios from 'axios'

import * as queries from './queries'
import * as mutations from './mutations'
import * as filters from './filters'

/** The endpoint at which the GQL server is running */
export const gqlEndpoint = 'https://api.graph.cool/simple/v1/Spoofy'

export const gql = {
  queries,
  mutations,
  filters,

}

/**
 * Root API for creating POST requests to GQL using Axios.
 */
const API = {
  graphql: (op) => {
   return axios({
     method:'post',
     url: gqlEndpoint,
     headers: {
       'Content-Type': 'application/json'
     },
     data: op,
     transformResponse: axios.defaults.transformResponse.concat((data) => {
       return data.data
     })
   })
 }
}

/**
 * Sends a query to the Graphql server using a transformation function from
 * the aws-amplify library. While we are not sending the request to AWS, they
 * functions they provide are useful for formatting GQL requests in the proper
 * format.
 * @param {*} query The query string to send to the database
 * @param {*} args The arguments object used to replace query variables in the query
 * string.
 * @returns A Promise for the return of information
 */
const gqlReq = (query, args) => {
  return API.graphql(graphqlOperation(query, args))
}

export default gqlReq