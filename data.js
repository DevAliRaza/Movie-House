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


  function getApiBaseUrl() {
    return 'http://localhost:3000';
  }


  // export function getMovies() { return data.movies; }

  export async function getMovies() {
    const apiUrl = `${getApiBaseUrl()}/api/movies`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error('Failed to fetch movies:', response.status);
      return [];
    }
    const movies = await response.json();
    return movies;
  }

  // export function getMovie(id) { 
  //   return data.movies.find(movie => movie.id === id); 
  // }
  
  export async function getMovie(id) {
    const apiUrl = `${getApiBaseUrl()}/api/movies/${id}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(`Failed to fetch movie with ID ${id}:`, response.status);
      return null;
    }
    
    const movie = await response.json();
    console.log(movie)
    return movie;
  }


  // export function getGenres() { return data.genres; }
  
  export async function getGenres() {
    const apiUrl = `${getApiBaseUrl()}/api/genres`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error('Failed to fetch genres:', response.status);
      return [];
    }
    const genres = await response.json();
    return genres;
  }

  // export function getGenre(id) { 
  //   return data.genres.find(genre => genre.id === id); 
  // }
  export async function getGenre(id) {
    const apiUrl = `${getApiBaseUrl()}/api/genres/${id}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(`Failed to fetch genre with ID ${id}:`, response.status);
      return null;
    }
    
    const genre = await response.json();
    console.log(genre)
    return genre;
  }


  // export function getDirectors() { return data.directors; }
  
  export async function getDirectors() {
    const apiUrl = `${getApiBaseUrl()}/api/directors`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error('Failed to fetch directors:', response.status);
      return [];
    }
    const directors = await response.json();
    return directors;
  }


  // export function getDirector(id) { 
  //   return data.directors.find(director => director.id === id); 
  // }
  
  export async function getDirector(id) {
    const apiUrl = `${getApiBaseUrl()}/api/directors/${id}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(`Failed to director genre with ID ${id}:`, response.status);
      return null;
    }
    
    const director = await response.json();
    console.log(director)
    return director;
  }



  export default data;