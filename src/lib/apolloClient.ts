import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { sessionStorage } from './auth';

// Create your main API endpoint (adjust this URL as needed)
const MAIN_API_URL = import.meta.env.VITE_MAIN_API_URL || 'http://localhost:3000/graphql';

// Auth link to add the token to requests
const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = new HttpLink({
  uri: MAIN_API_URL,
});

// Create the main Apollo Client for your CMS API
const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;
