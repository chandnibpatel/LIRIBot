//code to read and set any environment variables with the dotenv package
require("dotenv").config();
var Spotify = require('node-spotify-api');
 // Then create a request with axios to the queryUrl
 var axios = require("axios");
//code  required to import the keys.js file
var keys = require("./keys.js");
// Reading Random Text
var fs=require("fs");
//Moment
var moment = require('moment');

// to access your keys information
var spotify = new Spotify(keys.spotify);

// Grab the user commands
var commandType = "";
commandType = process.argv[2];
var commandText= process.argv[3];

// Read random text file for command do-what-it-says
function readRandom()
{
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
       // Break down all the numbers inside
        data = data.split(",");
       console.log("command Selected:",data[0]+" "+ data[1]);
     
    commandSelection(data[0],data[1]);
    });
    
}
// BONUS to write a log file
function writeToLog(msg)
{
    var logrec= moment().format();

     //Apend record to file
  fs.appendFile("log.txt",logrec+" " + msg + "\n ", function(err) {
        if (err) {
      return console.log(err);
    }
  });

}

//Evaluate the Command selection and the search argument
function commandSelection(commandType, commandText)
{
    switch(commandType){
        case 'concert-this':
          if (commandText===undefined )
            commandText='Carlos';
            bandDetails(commandText);
            break;

        case 'spotify-this-song':
            if (commandText===undefined )
            {
            commandText='Ace of Base'
            console.log("Default Song:"+commandText)
             }
            songSearch(commandText);
            break;

        case 'movie-this':
           if (commandText===undefined )
            commandText='Mr. Nobody'
            movieDetails(commandText);
            break;
        case 'do-what-it-says':
            readRandom();
            break;
        case 'default':
            console.log("unknown");
            break;
    }
}

//function to search for a movie details using axios
function movieDetails(movieName){
    // Grab or assemble the movie name and store it in a variable called "movieName"
   
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // If the request with axios is successful
    axios.get(queryUrl).then(function(response){
      
        console.log("Movie Title:" , response.data.Title);
        console.log("Released Year:" , response.data.Year);
        console.log("IMDB Rating:" , response.data.imdbRating);
        console.log("Rotten Tomatoes Rating:" , response.data.Ratings[1].Value);
        console.log("Country:" , response.data.Country);
        console.log("Launguage:" , response.data.Language);
        console.log("Plot:" , response.data.Plot);
        console.log("Actors:" , response.data.Actors);

        writeToLog("Movie Requested: " + movieName + ", Movie Title:" + response.data.Title +", Released Year: " + response.data.Year +
         ", IMDB Rating: " + response.data.imdbRating + ", Actors: " + response.data.Actors );
   
    }).catch(function(error){
        if(error.response)
        {
            console.log("error.response");
        }
    })
}

//function to search for a song details
function songSearch(searchSong)
{   
    spotify.search({ type: 'track', query: searchSong,limit:1 })
    .then(function(result) {
     
      if(result.tracks.items.length > 0){

      console.log("Album Name:", result.tracks.items[0].album.name);
      console.log("Song Name:", result.tracks.items[0].name);
      console.log("Artist Name:", result.tracks.items[0].artists[0].name);
      console.log("Song preview link:", result.tracks.items[0].preview_url);

       //Write to log file
       writeToLog("Song Requested:  "+ searchSong + ", Song Name: "+ result.tracks.items[0].name + ", Album Name: " + result.tracks.items[0].album.name + ", Artist Name: " + result.tracks.items[0].artists[0].name 
       + ", Song preview link: "+ result.tracks.items[0].preview_url  );
        }
      
    })
    .catch(function(err) {
      console.log(err);
    });
    
}
//function to search for a bands in town event details
function bandDetails(artist){
    console.log("Artist Name:",artist);
    // Then run a request with axios
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

   
    axios.get(queryUrl).then(function(response){

        console.log("Name of the venue:", response.data[0].venue.name);
        console.log("Venue location:", response.data[0].venue.city + ","+response.data[0].venue.country);
        console.log("Date of the Event", moment(response.data[0].datetime).format("MM/DD/YYYY") );

        //Write to log file
        writeToLog("Bands in Town Requested: " + artist +", Artist:" + artist +", venue: " + response.data[0].venue.name + ", Location: " + response.data[0].venue.city + ","+response.data[0].venue.country + ", Event Date: " 
        +  moment(response.data[0].datetime).format("MM/DD/YYYY")  );
        
    }).catch(function(error){

        if(error.response)
        {
            console.log("error.response");
        }
    })
}


//main Process 
commandSelection(commandType,commandText);
