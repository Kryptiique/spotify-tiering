# Spoofy Tiering

Spoofy is a webapp where you and your friends can share and rate songs together using Spotify. Users can create "Circles", invite their friends to join, then add songs to start assigning "Tier" ratings to. 

*NOTE: users must have a Spotify account to use Spoofy.

## Server

```.../spotify-tiering/tiering-server ```

This part of the application handles OAuth flow requests through Spotify as well as accessing the app's database with [GraphQL](https://graphql.org/). The server is authorized to access the Spotify OAuth flow that is tied to this app specifically using Julián McClinton's account, and must be reconfigured if maintained by someone else. Please note that the app is setup for **NON COMMERCIAL USE**.

More information on how Spotify's OAuth works can be found [here](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow).

To test locally, you must have [Node.js](https://nodejs.org/en/download/) installed on your machine, as well as nodemon installed globally. Then run
```
npm i
npm start
```
I will try to keep the server up and running whenever possible, but no promises. Especially if changes are made to the app.

### GraphQL

This allows easy flow of data between the data storage endpoint (which is currently a SQLite database) and the client frontend. For data such as playlist updates, comments, and ratings, the Client hooks into the server using websockets so that the data is live.

### SQLite Database

This stores all the information related to the operation of the app. The database is unmanaged for the most part

## Client

```.../spotify-tiering/tiering-site ```

This is the actual website, built using [React](https://reactjs.org/). To test locally, you must have [Node.js](https://nodejs.org/en/download/) installed on your machine.


```
$ cd [repo location]/spotify-tiering/tiering-site 
$ npm i
$ npm start
```

### Login Process

Users are logged into the system using their Spotify Credentials. The process is a bit cumbersome, so please simplify it if you know how!

1. The user is first redirected to the Spoofy server via the root url in order to request access to Spotify. 

2. The server, which is authorized to access the Spotify authentication API using the Client ID/Secret pattern (specific to the Spoofy App), then redirects to Spotify's OAuth2 page where the user logs in. 

3. Once logged in, Spotify redirects the user back to the Spoofy server, which then fowards the access token to the client via URI querystring. 

4. The Client lands on the login page, which then uses the querystring to determine the user information and checks it against the database. If it is a new user, a new entry in the database is created.

5. Once authenticated, the user is redirected to their profile page.

# Contributors

[Julián Kristofer McClinton](https://github.com/Kryptiique/)

# Licensing

... not licensed yet, sorry.