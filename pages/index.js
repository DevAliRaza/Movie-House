import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '@/styles/Trending.module.css';
import { getMovies } from '../data.js';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

function Home() {
  const router = useRouter();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  useEffect(() => {
    async function fetchMovies() {
      try {
        const allMovies = await getMovies(); 
        const sortedMovies = allMovies
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        setTrendingMovies(sortedMovies);
      } catch (error) {
        console.error('Failed to fetch trending movies:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <Head>
        <title>Trending Movies</title>
      </Head>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="bg-white dark:bg-gray-900">
          <header className="flex justify-end p-4">
            <ThemeToggle />
          </header>
        
          <main className={styles.container}>
            <h1 className={`${styles.title} ${darkMode ? 'text-white' : 'text-black'}`}>
              Trending Movies
            </h1>
            
            <div className={styles.buttonGroup}>
              <button 
                onClick={() => router.push('/genres')} 
                className={`${styles.browseButton} ${darkMode ? styles.darkButton : ''}`}
              >
                Browse Genres 
              </button>
              <button 
                onClick={() => router.push('/movies')} 
                className={`${styles.browseButton} ${darkMode ? styles.darkButton : ''}`}
              >
                All Movies
              </button>
              <button 
                onClick={() => router.push('/directors')} 
                className={`${styles.browseButton} ${darkMode ? styles.darkButton : ''}`}
              >
                All Directors
              </button>
            </div>

            {loading ? (
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Loading trending movies...
              </p>
            ) : (
              <div className={styles.movieGrid}>
                {trendingMovies.map((movie) => (
                  <div 
                    key={movie.id}
                    className={`${styles.movieCard} ${darkMode ? styles.darkCard : ''}`}
                    onClick={() => router.push(`/movies/${movie.id}`)}
                  >
                    <h2 className={darkMode ? 'text-white' : 'text-black'}>{movie.title}</h2>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      Rating: {movie.rating}
                    </p>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      Year: {movie.releaseYear}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default Home;