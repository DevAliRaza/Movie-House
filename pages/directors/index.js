import Head from 'next/head';
import useSWR from 'swr';
import styles from '@/styles/Directors.module.css';
import { getDirectors, getMovies } from '../../data';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

const fetcher = async () => {
  const directors = await getDirectors();
  const movies = await getMovies();
  return directors.map(director => {
    const movieCount = movies.filter(m => m.directorId === director.id).length;
    return {
      id: director.id,
      name: director.name,
      biography: director.biography,
      movieCount
    };
  });
};

export default function DirectorsPage() {
  const router = useRouter();
  const { data: directors, error, isLoading } = useSWR('directors', fetcher);
  const { darkMode } = useTheme();

  useEffect(() => {
    if (!isLoading && error) {
      router.push('/404');
    }
  }, [isLoading, error, router]);

  return (
    <>
      <Head>
        <title>Movie Directors</title>
      </Head>
      
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="bg-white dark:bg-gray-900">
          <header className="flex justify-end p-4">
            <ThemeToggle />
          </header>

          <main className={`${styles.main} ${darkMode ? 'dark-main' : ''}`}>
            <h1 className={`${styles.title} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Movie Directors
            </h1>
            
            <div className={styles.directorGrid}>
              {directors?.map(director => (
                <div 
                  key={director.id} 
                  className={`${styles.directorCard} ${darkMode ? 'dark-card' : ''}`}
                >
                  <div className={styles.cardContent}>
                    <h2 className={`${styles.directorName} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {director.name}
                    </h2>
                    <p className={`${styles.bioPreview} ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {director.biography}
                    </p>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                      Movies: {director.movieCount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}