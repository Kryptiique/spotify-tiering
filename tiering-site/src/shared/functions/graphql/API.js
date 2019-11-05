import { graphqlOperation } from 'aws-amplify'
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
 * Sends a query to the Graphql server
 * @param {*} query 
 * @param {*} args 
 * @returns A Promise for the return of information
 */
const gqlReq = (query, args) => {
  API.graphql(graphqlOperation(query, args))
}

export default gqlReq