import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/GenreMovies.module.css';
import { getGenres, getGenre, getMovies, getDirector } from '../../data';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

export default function GenreMoviesPage({ genre, movies }) {
  const { darkMode } = useTheme();

  return (
    <>
      <Head>
        <title>{genre.name} Movies</title>
      </Head>
      
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className={darkMode ? styles.darkMain : styles.main}>
          <header className="flex justify-end p-4">
            <ThemeToggle />
          </header>
          
          <div className={styles.movieGrid}>
            {movies.map(movie => (
              <div 
                key={movie.id} 
                className={`${styles.movieCard} ${darkMode ? styles.darkCard : ''}`}
              >
                <Link href={`/movies/${movie.id}`}>
                  <div className={styles.cardContent}>
                    <h2>{movie.title}</h2>
                    <p>Rating: {movie.rating}</p>
                    <p>Year: {movie.releaseYear}</p>
                    <p>Director: {movie.director.name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const genres = await getGenres();
  const paths = genres.map(genre => ({
    params: { id: genre.id }
  }));

  return {
    paths,
    fallback: "blocking"
  };
}

export async function getStaticProps({ params }) {
  const genre = await getGenre(params.id);
  const allMovies = await getMovies();    

  const filteredMovies = allMovies.filter(
    movie => movie.genreId === params.id
  );

  const movies = await Promise.all(
    filteredMovies.map(async (movie) => {
      const director = await getDirector(movie.directorId); 
      return {
        ...movie,
        director
      };
    })
  );

  const allGenres = await getGenres(); 

  return {
    props: {
      genre,
      movies,
      allGenres
    }
  };
}