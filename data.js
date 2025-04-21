const data = {
    "movies": [
      {
        "id": "1",
        "title": "Inception",
        "directorId": "d1",
        "description": "A mind-bending thriller about dreams within dreams.",
        "releaseYear": 2010,
        "genreId": "g1",
        "rating": 8.8
      },
      {
        "id": "2",
        "title": "The Great Gatsby",
        "directorId": "d3",
        "description": "A mysterious millionaire throws lavish parties in 1920s New York.",
        "releaseYear": 2013,
        "genreId": "g4",
        "rating": 7.2
      },
      {
        "id": "3",
        "title": "Interstellar",
        "directorId": "d1",
        "description": "A team of explorers travel through a wormhole in space.",
        "releaseYear": 2014,
        "genreId": "g3",
        "rating": 8.6
      },
      {
        "id": "4",
        "title": "Parasite",
        "directorId": "d4",
        "description": "A poor family schemes to become employed by a wealthy household.",
        "releaseYear": 2019,
        "genreId": "g5",
        "rating": 8.6
      },
      {
        "id": "5",
        "title": "The Matrix",
        "directorId": "d5",
        "description": "A hacker discovers the reality he lives in is a simulation.",
        "releaseYear": 1999,
        "genreId": "g1",
        "rating": 8.7
      },
      {
        "id": "6",
        "title": "La La Land",
        "directorId": "d6",
        "description": "A jazz musician and an aspiring actress fall in love in Los Angeles.",
        "releaseYear": 2016,
        "genreId": "g4",
        "rating": 8.0
      }
    ],
  
    "genres": [
      {
        "id": "g1",
        "name": "Science Fiction"
      },
      {
        "id": "g3",
        "name": "Adventure"
      },
      {
        "id": "g4",
        "name": "Drama"
      },
      {
        "id": "g5",
        "name": "Thriller"
      }
    ],
  
    "directors": [
      {
        "id": "d1",
        "name": "Christopher Nolan",
        "biography": "British-American director known for complex storytelling and visual innovation."
      },
      {
        "id": "d3",
        "name": "Baz Luhrmann",
        "biography": "Australian director known for visually extravagant films like Moulin Rouge! and The Great Gatsby."
      },
      {
        "id": "d4",
        "name": "Bong Joon-ho",
        "biography": "South Korean filmmaker acclaimed for combining drama, social commentary, and thrills."
      },
      {
        "id": "d5",
        "name": "The Wachowskis",
        "biography": "Sibling duo behind groundbreaking sci-fi films including The Matrix trilogy."
      },
      {
        "id": "d6",
        "name": "Damien Chazelle",
        "biography": "American director known for musical dramas like Whiplash and La La Land."
      }
    ]
  }
  export function getMovies() { return data.movies; }

  // Get a movie by ID (string match since your IDs are strings)
  export function getMovie(id) { 
    return data.movies.find(movie => movie.id === id); 
  }
  
  // Get all genres
  export function getGenres() { return data.genres; }
  
  // Get a genre by ID
  export function getGenre(id) { 
    return data.genres.find(genre => genre.id === id); 
  }
  
  // Get all directors
  export function getDirectors() { return data.directors; }
  
  // Get a director by ID
  export function getDirector(id) { 
    return data.directors.find(director => director.id === id); 
  }
  
  export default data;