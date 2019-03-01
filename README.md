# LIRIBot
Node JS Assignment

# Link to Video (Demo)
https://drive.google.com/file/d/1tm1CLHsgsk3aC3z9y0ussvXuCRCz_QOa/view

# App Functionality:
 liri.js can take in one of the following commands:

1) concert-this       : Searches the upcoming band event for the artist in Town using BandinTown API
2) spotify-this-song  : Searches song dteails using Spotify node api
3) movie-this         : Seacrhes movie details using axios and OMDB API
4) do-what-it-says    : It takes the command from random.txt file and gives the respective details.

# Each Command will search

1) node liri.js concert-this <artist/band name here>

Name of the venue
Venue location
Date of the Event ( format  "MM/DD/YYYY")

2) node liri.js spotify-this-song '<song name here>'

Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from
If no song is provided then your program will default to "The Sign" by Ace of Base.

3) node liri.js movie-this '<movie name here>'

  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.
 If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
 
 4) node liri.js do-what-it-says
  Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

# User Logging:
Every user activity (related to search command) is being logged in log.txt file along with date and timestamp and the response user get.
