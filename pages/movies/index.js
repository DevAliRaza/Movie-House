import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styles from '@/styles/Movies.module.css';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';
import { getMovies, getGenre, getDirector, getGenres } from '../../data';

export default function MoviesPage({ movies, allGenres }) {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const { darkMode } = useTheme();

  const filteredMovies = movies.filter(movie =>
    selectedGenre === 'all' || movie.genre?.id === selectedGenre
  );

  return (
    <>
      <Head>
        <title>All Movies</title>
      </Head>

      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <main className={darkMode ? styles.darkMain : styles.main}>
          <header className="flex justify-end p-4">
            <ThemeToggle />
          </header>

          <h1 className={styles.title}>All Movies</h1>

          <div className={styles.filterControls}>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Genres</option>
              {allGenres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.movieGrid}>
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className={`${styles.movieCard} ${darkMode ? styles.darkCard : ''}`}
              >
                <Link href={`/movies/${movie.id}`}>
                  <div className={styles.cardContent}>
                    <h2>{movie.title}</h2>
                    <p>Rating: {movie.rating}</p>
                    <p>Year: {movie.releaseYear}</p>
                    <p>{movie.genre?.name || 'Unknown Genre'}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const rawMovies = await getMovies();

  const moviesWithDetails = await Promise.all(
    rawMovies.map(async (movie) => {
      const genre = await getGenre(movie.genreId);
      const director = await getDirector(movie.directorId);
      return { ...movie, genre, director };
    })
  );

  const movies = moviesWithDetails.filter((movie) => movie.genre);
  const allGenres = await getGenres();

  return {
    props: { movies, allGenres },
    revalidate: 60,
  };
}
