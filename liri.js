//code to read and set any environment variables with the dotenv package
require("dotenv").config();
var Spotify = require('node-spotify-api');
 // Then create a request with axios to the queryUrl
 var axios = require("axios");
//code  required to import the keys.js file
var keys = require("./keys.js");
// Reading Random Text
var fs=require("fs");

// to access your keys information
var spotify = new Spotify(keys.spotify);

// Grab the user commands
var commandType = "";
commandType = process.argv[2];
var commandText= process.argv[3];
commandSelection(commandType,commandText);

function commandSelection(commandType, commandText)
{
  
switch(commandType){
    case 'concert-this':
        console.log ('concert-this');
        if (commandText===undefined )
        commandText='Carlos';
        bandDetails(commandText);
        break;

    case 'spotify-this-song':
        console.log("spotify-this-song");
        if (commandText===undefined )
        commandText='The Sign'
        songSearch(commandText);
        break;

    case 'movie-this':
        console.log( "movie-this");
        if (commandText===undefined )
        commandText='Mr. Nobody'
        movieDetails(commandText);
        break;
    case 'do-what-it-says':
        console.log("do-what-it-says");
        readRandom();
        break;
    case 'default':
        console.log("unknown");
        break;
}

}
function movieDetails(movieName){
    // Grab or assemble the movie name and store it in a variable called "movieName"
   
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);


    // If the request with axios is successful
    axios.get(queryUrl).then(function(response){
        console.log(response.data);
    }).catch(function(error){
        if(error.response)
        {
            console.log("error.response");
        }
    })
}

function songSearch(searchSong)
{
    
    var result;
   
    spotify.search({ type: 'album', query: searchSong,market:'US' })
    .then(function(result) {
      console.log(result);
      result.albums.items.forEach(element => {
        console.log(element)
    });
    })
    .catch(function(err) {
      console.log(err);
    });
    
}
function bandDetails(artist){
    console.log(artist);
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";


    // If the request with axios is successful
    axios.get(queryUrl).then(function(response){
       // var bandResult=JSON.stringify(response.data);

        console.log("Venue Name:", response.data[0].venue.name);
        console.log("Location:", response.data[0].venue.city + ","+response.data[0].venue.country);
       // console.log(JSON.stringify(response.data));
    }).catch(function(error){

        if(error.response)
        {
            console.log("error.response");
        }
    })
}
function readRandom()
{
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
       // Break down all the numbers inside
        data = data.split(",");
       console.log(data[0]);
       console.log(data[1]);
    commandSelection(data[0],data[1]);
    });
    
}