import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import styles from '@/styles/Director.module.css';
import { getMovies, getMovie, getDirector } from '../../../data';

const fetcher = (movieId) => {
  
  const currentMovie = getMovie(movieId);                 //CSR using SWR
  const director = getDirector(currentMovie.directorId);
  const directorsMovies = getMovies().filter(
    movie => movie.directorId === currentMovie.directorId
  );
  
  return {
    currentMovieTitle: currentMovie.title,
    director,
    directorsMovies
  };
};

export default function DirectorPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const { data, error, isLoading } = useSWR(id, fetcher);

  if (isLoading){
    return <div className={styles.loading}>Loading...</div>
  } 
  if (error){
    return <div className={styles.error}>{error.message}</div>
} 
  if (!data){
    return <div className={styles.error}>No data found</div>

  } 
  const { currentMovieTitle, director, directorsMovies } = data;

  return (
    <>
      <Head>
        <title>{currentMovieTitle}</title>
      </Head>
      
      <main className={styles.main}>
        <div className={styles.directorInfo}>
          <h1>Director of {currentMovieTitle}</h1>
          <h2>{director.name}</h2>
          <p><strong>Biography:</strong> {director.biography}</p>
          
          <h3>All Movies Directed:</h3>
          <ul className={styles.moviesList}>
            {directorsMovies.map(movie => (
              <li key={movie.id}>
                <Link href={`/movies/${movie.id}`} className={styles.movieLink}>
                  {movie.title} {movie.releaseYear}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}