import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Genres.module.css';
import { getGenres, getMovies } from '../../data';

export default function GenresPage({ genres }) {
  return (
    <>
      <Head>
        <title>Movie Genres</title>
      </Head>
      
      <main className={styles.main}>
        <h1>Movie Genres</h1>
        
        <div className={styles.genreGrid}>
          {genres.map((genre) => (
            <Link 
              key={genre.id} 
              href={`/genres/${genre.id}`}
              className={styles.genreCard}
            >
              <div>
                <h2>{genre.name}</h2>
                <p>{genre.movieCount} movies</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const genres = getGenres();
  const movies = getMovies();
  const genresWithCounts = genres.map(genre => {
    const movieCount = movies.filter(movie => movie.genreId === genre.id).length;
    return {
        id: genre.id,
        name: genre.name,
        movieCount
    };
  });

  return {
    props: {
      genres: genresWithCounts
    }
  };
}