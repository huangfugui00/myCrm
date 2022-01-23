import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useEffect} from 'react'
import { useRouter } from 'next/router'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({ uri: 'http://localhost:3001/graphql' , cache: new InMemoryCache()});

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

  return (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
  )
}

export default MyApp
