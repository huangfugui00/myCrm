import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useEffect} from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', (url, { shallow }) => {
      console.log(`App is changing to ${url}`)
    })
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
       <Component/>
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
