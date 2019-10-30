# Spoofy Tiering

Spoofy is a webapp where you and your friends can share and rate songs together using Spotify. Users can create "Circles", invite their friends to join, then add songs to start assigning "Tier" ratings to. 

*NOTE: users must have a Spotify account to use Spoofy.

## Server

```.../spotify-tiering/tiering-server ```

This part of the application handles OAuth authorization requests through Spotify as well as accessing the app's database with [GraphQL](https://graphql.org/).

More information on how Spotify's OAuth works can be found [here](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow).

## Client

```.../spotify-tiering/tiering-site ```

This is the actual website, built using [React](https://reactjs.org/). To test locally, you must have [Node.js](https://nodejs.org/en/download/) installed on your machine.


```
cd [repo location]/spotify-tiering/tiering-site 
npm i
npm start
```

# Contributors

[Julián Kristofer McClinton](https://github.com/Kryptiique/)

# Licensing

... not licensed yet, sorry.