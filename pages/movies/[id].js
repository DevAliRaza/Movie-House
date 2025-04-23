import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/Movie.module.css';
import { getMovie, getDirector, getGenre, getMovies } from '../../data';


export default function MovieDetails({ movie, director, genre }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{movie.title} - Details</title>
      </Head>
      
      <main className={styles.main}>
        
        
        <div className={styles.movieDetails}>
          <h1>{movie.title}</h1>
          <p>Rating: {movie.rating}</p>
          <p>Release Year: {movie.releaseYear}</p>
          <p>Description: {movie.description}</p>
          
          <Link 
            href={`/movies/${movie.id}/director`}
            className={styles.directorLink}
          >
            View director {director.name}'s Full Information
          </Link>
        </div>
      </main>
    </>
  );
}


export async function getStaticPaths() {
  const movies = getMovies();
  const paths = movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const movie = getMovie(params.id);
  const director = getDirector(movie.directorId);
  const genre = getGenre(movie.genreId);
  
  return {
    props: {
      movie,
      director,
      genre
    },
  };
}