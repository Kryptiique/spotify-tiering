# Spoofy Tiering

![logo.svg](https://github.com/Kryptiique/spotify-tiering/blob/develop/tiering-site/src/shared/static/spoofy%20logo%20site.svg)

Spoofy is a webapp where you and your friends can share and rate songs together using Spotify. Users can create "Circles", invite their friends to join, then add songs to start assigning "Tier" ratings to. 

*NOTE: users must have a Spotify account to use Spoofy.

## Server

```.../spotify-tiering/tiering-server ```

This part of the application handles OAuth flow requests through Spotify. (Used to also handle GraphQL requests, but this has changed in favor of GraphCool) The server is authorized to access the Spotify OAuth flow that is tied to this app specifically using Julián McClinton's account, and must be reconfigured if maintained by someone else. Please note that the app is setup for **NON COMMERCIAL USE**.

More information on how Spotify's OAuth works can be found [here](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow).

To test locally, you must have [Node.js](https://nodejs.org/en/download/) installed on your machine, as well as nodemon installed globally. Then run
```
npm i
npm start
```
I will try to keep the server up and running whenever possible, but no promises. Especially if changes are made to the app.

### GraphQL

Setup using [GraphCool](https://www.graph.cool/), the [GraphQL](https://graphql.org/) portion of the app acts as the main storage. Using a SQL database, the GraphCool endpoint allows the client frontend to easily retrieve data using a query language instead of through REST API requests. Additonally, it uses authentication to prevent specifi mutations from being made by unauthorized users (not currently utilized). For live data such as playlist updates, comments, and ratings, the Client hooks into the GraphCool server using websockets so that the data is live. Here is a graphical representation of the schema:

![gql_schema.png](https://github.com/Kryptiique/spotify-tiering/blob/develop/docs/graphql%20schema.png)

I have [included a file](https://github.com/Kryptiique/spotify-tiering/blob/develop/tiering-site/src/shared/functions/graphql/operations.js) that simplifies interaction betwenn the GraphQL endpoint to all the different mutations that can be performed, so take a look at that.

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
