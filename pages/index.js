import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '@/styles/Trending.module.css';
import { getMovies } from '../data.js';

export default function Home() {
  const router = useRouter();
  const movies = getMovies().sort((a, b) => b.rating - a.rating)
  .slice(0,3);

  return (
    <>
      <Head>
        <title>Trending Movies</title>
      </Head>
      
      <main className={styles.main}>
        <h1>Trending Movies</h1>
        <button onClick={() => router.push('/genres')} className={styles.browseButton}>
          Browse Genres 
          </button>
        <button onClick={() => router.push('/movies')} className={styles.browseButton}>
          All Movies
           </button>

        <div className={styles.movieGrid}>
          {movies.map((movie) => (
            <div 
              key={movie.id}
              className={styles.movieCard}
              onClick={() => router.push(`/movies/${movie.id}`)}>
              <h2>{movie.title}</h2>
              <p>{movie.rating}</p>
              <p>{movie.releaseYear}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}