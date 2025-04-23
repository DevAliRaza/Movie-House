import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import styles from '@/styles/Directors.module.css';
import { getDirectors , getMovies } from '../../data';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const fetcher = () => {
    const directors = getDirectors();
    const movies = getMovies();                                                             //CSR using SWR
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
      
      <main className={styles.main}>
        <h1 className={styles.title}>Movie Directors</h1>
        
        <div className={styles.directorGrid}>
          {directors?.map(director => (
            <div key={director.id} className={styles.directorCard}>
              
                <div className={styles.cardContent}>
                  <h2 className={styles.directorName}>{director.name}</h2>
                  <p className={styles.bioPreview}>
                    {director.biography}
                  </p>
                </div>
             
            </div>
          ))}
        </div>
      </main>
    </>
  );
}