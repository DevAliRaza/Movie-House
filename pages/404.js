import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/404.module.css';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | Movie App</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.subtitle}>Page not found</h2>
          <div className={styles.actions}>
            <Link href="/" className={styles.homeButton}>
              Go to Homepage
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}