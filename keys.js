//console.log('this is loaded');
require("dotenv").config();
//console.log("Spotify ID:" +process.env.SPOTIFY_ID);
//var spotify = require('node-spotify-api');
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};