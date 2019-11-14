import React, { Component } from 'react'

import { spotifyAPI } from '../../index'
import '../styles/SpotifyCard.css'

export default class SpotifyCard extends Component {

  constructor(props){
    super(props)

    this.state = {
      tracks: []
    }
  }

  componentDidMount(){
    // const card = this
  
    // console.debug('SAPI AT: ', spotifyAPI.getAccessToken())
    // spotifyAPI.getMyCurrentPlaybackState().then(response => {
    //   card.setState({
    //     nowPlaying: { 
    //         name: response.item.name, 
    //         albumArt: response.item.album.images[0].url
    //       }
    //   })
    // })
  }

  nextSong(){

  }

  previousSong(){

  }

  togglePlay(){

  }



  render(){
    return (
      <div className='spotify-card'>
        <img src={} alt='currentSong'></img>
      </div>
    )
  }
}

