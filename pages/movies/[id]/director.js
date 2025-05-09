import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '@/styles/Director.module.css';
import { getMovies, getDirector } from '@/data';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

export default function DirectorPage() {
  const router = useRouter();
  const { id } = router.query;
  const { darkMode } = useTheme();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [directorData, setDirectorData] = useState({
    currentMovieTitle: '',
    director: null,
    directorsMovies: [],
  });

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        const allMovies = await getMovies();
        const currentMovie = allMovies.find((m) => m.id === id);
        if (!currentMovie) throw new Error('Movie not found');

        const director = await getDirector(currentMovie.directorId);
        const directorsMovies = allMovies.filter(
          (m) => m.directorId === currentMovie.directorId
        );

        setDirectorData({
          currentMovieTitle: currentMovie.title,
          director,
          directorsMovies,
        });
      } catch (err) {
        console.error('❌ Failed to load director data:', err);
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const { currentMovieTitle, director, directorsMovies } = directorData;

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error || !director) {
    return <div className={styles.error}>Error: {error || 'Director not found'}</div>;
  }

  return (
    <>
      <Head>
        <title>{currentMovieTitle} - Director</title>
      </Head>

      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <main className={darkMode ? styles.darkMain : styles.main}>
          <header className="flex justify-end p-4">
            <ThemeToggle />
          </header>

          <div className={styles.directorInfo}>
            <h1>Director of {currentMovieTitle}</h1>
            <h2>{director.name}</h2>
            <p><strong>Biography:</strong> {director.biography}</p>

            <h3>All Movies Directed:</h3>
            <ul className={styles.movieList}>
              {directorsMovies.map((movie) => (
                <li key={movie.id}>
                  <Link href={`/movies/${movie.id}`} className={styles.movieLink}>
                    {movie.title} ({movie.releaseYear})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}
