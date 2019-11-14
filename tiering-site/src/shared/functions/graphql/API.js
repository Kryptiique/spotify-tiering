import { graphqlOperation } from 'aws-amplify'
import axios from 'axios'
import { 
  Network, 
  Store, 
  Environment, 
  RecordResource 
} from 'relay-runtime'
import SubscriptionClient from 'subscriptions-transport-ws'

import { GC_AUTH_TOKEN }from '../../constants'
import * as queries from './queries'
import * as mutations from './mutations'
import * as filters from './filters'


/** All queries, mutations, and filters we user for GraphQL */
export const gql = {
  queries,
  mutations,
  filters,
}

const store = new Store(new RecordResource())
const fetchQuery = (operation, variables) => {
  return axios({
    url: global.gConfig.api.graphql,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/jsonn',
      'Authorization': `Bearer ${ localStorage.getItem(GC_AUTH_TOKEN) }`
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    })
  }).then(response => {
    return response
  })
}

/**
 * Setup the object used for handling subscriptions through
 * a web socket
 * @param {*} config 
 * @param {*} variables The query variables
 * @param {*} cacheConfig 
 * @param {*} observer 
 */
const setupSubscription = (config, variables, cacheConfig, observer) => {
  const query = config.text

  const subscriptionClient = new SubscriptionClient(global.gConfig.api.graphql_subscriptions,
    { reconnect: true })
  subscriptionClient.subscribe({query, variables}, (error, result) => {
    observer.onNext({data: result})
  })
}

const network = Network.create(fetchQuery, setupSubscription)
export const environment = new Environment({
  network,
  store,
})

/**
 * Root API for creating POST requests to GQL using Axios.
 * This was created with AWS API in mind, but can be replaced with
 * React-Relay stuff
 */
const API = {
  graphql: (op) => {
   return axios({
      method:'post',
      /** The endpoint at which the GQL server is running */
      url: global.gConfig.api.graphql,
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

/** Exactly the same as a regular query request, except does not return a
 * promise. Instead, it returns the response from the the server
 */
export async function gqlReqSync (query, args) {
  return await API.graphql(graphqlOperation(query, args))
}