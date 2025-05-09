import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/Movie.module.css';
import { useTheme } from '@/context/ThemeContext';
import { getMovie, getDirector, getGenre, getMovies } from '../../data';
import ThemeToggle from '@/components/ThemeToggle';

export default function MovieDetails({ movie, director, genre }) {
  const router = useRouter();
  const { darkMode } = useTheme();

  return (
    <>
      <Head>
        <title>{movie.title} - Details</title>
      </Head>

      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <main className={darkMode ? styles.darkMain : styles.main}>
          <header className="flex justify-end p-4">
            <ThemeToggle />
          </header>

          <div className={styles.movieDetails}>
            <h1>{movie.title}</h1>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <p><strong>Release Year:</strong> {movie.releaseYear}</p>
            <p><strong>Genre:</strong> {genre.name}</p>
            <p><strong>Director:</strong> {director.name}</p>
            <p><strong>Description:</strong> {movie.description}</p>

            <Link href={`/movies/${movie.id}/director`} className={styles.directorLink}>
              View Director's Full Info
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const movies = await getMovies();
  const paths = movies.map(movie => ({ params: { id: movie.id } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const movie = await getMovie(params.id);
  const director = await getDirector(movie.directorId);
  const genre = await getGenre(movie.genreId);

  return {
    props: { movie, director, genre }
  };
}
