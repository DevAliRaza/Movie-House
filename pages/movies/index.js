import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styles from '@/styles/Movies.module.css';
import { getMovies, getGenre, getDirector, getGenres } from '../../data';

export default function MoviesPage({ movies, allGenres }) {
  const [selectedGenre, setSelectedGenre] = useState('all');

  const filteredMovies = movies.filter(movie => 
    selectedGenre === 'all' || movie.genre?.id === selectedGenre
  );
  return (
    <>
      <Head>
        <title>All Movies</title>
      </Head>
      
      <main className={styles.main}>
        <h1>All Movies</h1>
        
        <div className={styles.filterControls}>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Genres</option>
            {allGenres.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.movieGrid}>
          {filteredMovies.map((movie) => (
            <div key={movie.id} className={styles.movieCard}>
              <Link href={`/movies/${movie.id}`}>
                <div className={styles.cardContent}>
                  <h2>{movie.title}</h2>
                  <p>{movie.rating}</p>
                  <p>{movie.releaseYear}</p>
                  <p>{movie.genre.name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const movies = getMovies().map(movie => ({
    ...movie,
    genre: getGenre(movie.genreId),
    director: getDirector(movie.directorId)
  }));

  return {
    props: {
      movies,
      allGenres: getGenres()
    },
    revalidate: 60
  };
}