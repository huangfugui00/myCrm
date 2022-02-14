import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { PersistGate } from 'redux-persist/integration/react'
import {store,persistor} from 'store'
import { Provider } from 'react-redux'
import { setContext } from '@apollo/client/link/context';

console.log('server url')
console.log(process.env.NEXT_PUBLIC_SERVER_URL)
const httpLink = createHttpLink({
  // uri: 'http://localhost:3001/graphql',
  uri:process.env.NEXT_PUBLIC_SERVER_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({ 
              link: authLink.concat(httpLink),
              cache: new InMemoryCache()
              });

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
      </Provider>
    </ApolloProvider>
  )
}

export default MyApp
