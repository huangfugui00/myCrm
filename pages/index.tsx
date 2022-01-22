import Head from 'next/head'
import Header from '../components/header'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Instagram clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
    </div>
  )
}
