import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Landing from './landing';

const Home: NextPage = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Head>
        <title>Parrot Pos</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <main>
        <Landing />
      </main>
    </div>
  );
};

export default Home;
