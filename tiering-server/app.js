
const express = require('express') // Express web server framework
const request = require('request') 
const cors = require('cors')
const querystring = require('querystring')
const cookieParser = require('cookie-parser')
const { ApolloServer } = require('apollo-server-express');
const { gql } = require('apollo-server-express');
const { importSchema } = require('graphql-import')


const spotify_config = require('./spotify-config')
const config = require('./config')
// console.debug(importSchema('./graphql_code/schema.graphql'))
const typeDefs = importSchema('graphql_code/schema.graphql')

const resolvers = require('./graphql_code/resolvers')

var redirect_uri = config.server_endpoint + 'callback' // redirect destination from OAuth
console.debug('redir:', redirect_uri)

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

var stateKey = 'spotify_auth_state'

var app = express()

// Build Scope:
const scopes = [
  'user-read-private',
  'user-read-email',
  'user-read-currently-playing',

  // 'streaming',
  // 'app-remote-control',

  'user-library-read',

  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
  'playlist-read-private',
]

var scope = scopes[0]
scopes.forEach(s => scope += ' ' + s)


app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser())

// GraphQL SETUP

const server = new ApolloServer({ 
  typeDefs,
  resolvers ,
  playground: {
    endpoint: '/graphql',
    settings:{
      "editor.theme":"dark"
    }
  }
});
server.applyMiddleware({ app });


// SPOTIFY AUTHINTICATION REQUEST HANDLING

/**
 * This operations handles logging into the system
 */
app.get('/login', function(req, res) {
  var state = generateRandomString(16)
  res.cookie(stateKey, state)

  // your application requests authorization
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: spotify_config.client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }))
})

/**
 * This operation returns us from OAuth and redirects back to
 * the main site
 */
app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null
  var state = req.query.state || null
  var storedState = req.cookies ? req.cookies[stateKey] : null

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }))
  } else {
    res.clearCookie(stateKey)
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(spotify_config.client_id + ':' + spotify_config.client_secret).toString('base64'))
      },
      json: true
    }

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        }

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body)
        })

        // we can also pass the token to the browser to make requests from there
        res.redirect(`${ config.client_endpoint }/#` +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }))
      } else {
        res.redirect(`${ config.client_endpoint }/#` +
          querystring.stringify({
            error: 'invalid_token'
          }))
      }
    })
  }
})

/**
 * This operation takes a refresh token and returns a new one 
 * ... I think
 */
app.get('/refresh_token', function(req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(spotify_config.client_id + ':' + spotify_config.client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  }

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token
      res.send({
        'access_token': access_token
      })
    }
  })
})

console.log(`Listening on ${ config.port }`)
app.listen(config.port)
