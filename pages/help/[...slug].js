import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/Movie.module.css';
import { getMovie, getDirector, getGenre, getMovies } from '../../data';


export default function MovieDetails({ movie, director, genre }) {
  const router = useRouter();
  return (
    <>
     
    </>
  );
}

