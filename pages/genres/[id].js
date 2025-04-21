import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/GenreMovies.module.css';
import { getGenres,getGenre, getMovies, getDirector } from '../../data';



export default function GenreMoviesPage({ genre, movies }) {
    return (
      <>
        <Head>
          <title>{genre.name} Movies</title>
        </Head>
        
        <main className={styles.main}>
          <div className={styles.movieGrid}>
            {movies.map(movie => (
              <div key={movie.id} className={styles.movieCard}>
                <Link href={`/movies/${movie.id}`}>
                  <div>
                    <h2>{movie.title}</h2>
                    <p>Rating: {movie.rating}</p>
                    <p>Year: {movie.releaseYear}</p>
                    <p>Director: {movie.director.name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </main>
      </>
    );
  }

export async function getStaticPaths() {
    const genres = getGenres();
    const paths = genres.map(genre => ({
      params: { id: genre.id }
    }));
  
    return {
      paths,
      fallback: false
    };
  }
  
  export async function getStaticProps({ params }) {
    const genre = getGenre(params.id);
    const allMovies = getMovies();
    
    const movies = allMovies
      .filter(movie => movie.genreId === params.id)
      .map(movie => ({
        ...movie,
        director: getDirector(movie.directorId)
      }));
  
    return {
      props: {
        genre,
        movies,
        allGenres: getGenres()
      }
    };
  }