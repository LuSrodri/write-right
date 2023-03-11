import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Write Right - Input a text and get the correction</title>
        <meta name="description" content="Input a text and get the correction." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Write Right</h1>
        <p>
          Input a text and get the correction
        </p>
      </main>
    </>
  )
}
