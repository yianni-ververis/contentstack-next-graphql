import { gql } from "@apollo/client";
import Head from 'next/head';
import Image from 'next/image';
import client from "../helpers/apollo-client";

import styles from '../styles/Home.module.css';

interface PageProps {
  data: {
    title: string;
    content: string;
    seo: {
      meta_title: string;
      description: string;
      keywords: string;
    }
  }
}

export default function Home({ data }: PageProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{data.seo.meta_title}</title>
        <meta name="description" content={data.seo.description} />
        <meta name="keywords" content={data.seo.keywords} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <div className={styles.description} dangerouslySetInnerHTML={{ __html: data.content }} />

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
    const { data } = await client.query({
      query: gql`
        query {
          all_home {
            items {
              title
              url
              content
              seo {
                description
                keywords
                meta_title
              }
            }
          }
        }
      `,
    });
  
  return {
    props: {
      data: data.all_home.items[0],
    },
 };
}