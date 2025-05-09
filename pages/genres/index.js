import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Genres.module.css';
import { getGenres, getMovies } from '../../data';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

export default function GenresPage({ genres }) {
  const { darkMode } = useTheme();

  return (
    <>
      <Head>
        <title>Movie Genres</title>
      </Head>

      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <main className={darkMode ? styles.darkMain : styles.main}>
          <header className="flex justify-end p-4">
            <ThemeToggle />
          </header>

          <h1 className={styles.title}>Movie Genres</h1>

          <div className={styles.genreGrid}>
            {genres.map((genre) => (
              <Link
                key={genre.id}
                href={`/genres/${genre.id}`}
                className={`${styles.genreCard} ${darkMode ? styles.darkCard : ''}`}
              >
                <div>
                  <h2>{genre.name}</h2>
                  <p>{genre.movieCount} movies</p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const genres = await getGenres();
  const movies = await getMovies();
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