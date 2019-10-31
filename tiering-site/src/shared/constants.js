import _ from 'lodash'

export const app_name = 'Spoofy'

/**
 * The possiblle categories to sort the playlist by
 */
export const sortCategories = {
  name: "Name",                   // the name of the song
  artist: "Artist",               // the name of the artist
  album: "Album",                 // the name of the album
  length: "Song Length",          // the length of the song
  rating: "Rating",               // the tier ranking given to the song
  dateAdded: "Date Added",        // date song was added to the playlist
}

/** Direction to sort image list */
export const sortDir = {
  ascending: 1,
  descending: -1
}

/** The initial state of the entire application */
export const initialState = {
  // User details
  user: {
    name: '...',
    feed: [],
    circles: []
  },

  // page for circle
  circle: {
    users: [],
    owner: undefined,
    playlist: {
      songs: []
    }
  },

  // Store for contiaining Song data
  song: {

  }


}

/**
 * Categorizes all pages with names and subdirectory links
 */
export const pages = {
  landing: '/',
  login: '/login',
  circles: '/cicles/',
  circle: '/circles/:circleid/',
  circleSettings: '/circles/settings/:circleid/',
  // comment: '/song/comment',
  profile: '/user/:userid/',
  my_profile: 'user/profile',
  song: '/song/:songid'
}

/**
 * All the cookies used by the site
 */
export const cookies = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token'
}

/**
 * preset color theme configurations
 */ 
export const themes = {
 // we're going flat single theme for this sheet
  Root:{ // Theme containing values shared between other themes
    primary: '#4e9bc1',
    primary_dark: '#1a72d8',

    highlight_1: '#23b4b4', // Turquoise
    highlight_2: '#ff9933', // Orange

    ARTIST: '#FF66FF',
    CHARACTER: '#00FF00',
    COPYRIGHT: '#FF9933',
    DESCRIPTOR: '#EEEEEE',
    GENRE: '#00FFFF',
  }
}

/**
 * Default style of modals
 */
export const modalStyle = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    overflow              : 'visible',
    borderRadius          : '10px',
    outline               : 'none',
    padding               : '40px',
    border: 0,
    backgroundColor       : '#495057',
    boxShadow             : '0 0 10px 3px #00000047',
  },
  overlay: {
    backgroundColor: '#000000D0'
  }
};

// Load local debug information



/**
 * Attempts to load test files into memory. Returns true on success, false on
 * failure.
 * This was created to help prevent builds from breaking without files that are
 * not synced through the git repo due to containing unwanted data. In other
 * words, debug data cannot be used if none of the required files are found.
 */
function loadFiles(){
  try{
    // const localEnvInfo = require('../../amplify/.config/local-env-info.json')
    const env = "test"
    global.gImageList = require(`./static/${env}/imageList.json`)
    global.gTagList = require(`./static/${env}/taglist.json`)
    global.gBatchList = require(`./static/${env}/batchList.json`)
  } catch(e) {
    console.warn(e)
    return false
  }

  return true
}

// var netFiles = []
global.gDataJSON = []
global.gHasJSONFiles = loadFiles()

// build listed data
// if(global.gHasJSONFiles){
  
// }

// Settings for changing how uploads are
// handled by the gateway
global.gUploadOptions = {
  mock:false,
  ignoreOtherDupe: true
}


// To test local values, set this value to true.
// NOTE: This will only work if all the necessary files are
// found on your machine.
const fromJSON = true
global.gFromJSON = global.gHasJSONFiles ? fromJSON : false
global.gSaveJSON = true
global.gFromAWS = false

// Whether to record image views
global.gViewing = false

// Config.json dependeant information ===========================

const config = require('./config.json')
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);
global.gConfig = finalConfig;

// console.log(global)