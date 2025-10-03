import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';

const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:3000/graphql-public';

// Create a separate Apollo Client for authentication service
const authClient = new ApolloClient({
  link: new HttpLink({
    uri: AUTH_API_URL,
    headers: {
      'apollographql-client-name': '@nivoda/public-gateway',
      'apollographql-client-version': '0.0.1',
    },
  }),
  cache: new InMemoryCache(),
});

// GraphQL Fragments
const GATEWAY_USER_FRAGMENT = gql`
  fragment GatewayUser on User {
    id
    firstName
    lastName
    country
    email
    role
    steps_required
    company {
      id
      name
      api_type
      __typename
    }
    __typename
  }
`;

const GATEWAY_CORE_SESSION_FRAGMENT = gql`
  fragment GatewayCoreSession on Session {
    token
    user {
      ...GatewayUser
      __typename
    }
    expires
    zendesk_token
    b2c_token
    __typename
  }
  ${GATEWAY_USER_FRAGMENT}
`;

// Authentication Mutation
export const AUTHENTICATE_USER = gql`
  query authenticateUser($username: String!, $password: String!, $twofactorauth: String) {
    authenticate {
      username_and_password(
        username: $username
        password: $password
        twofactorauth: $twofactorauth
      ) {
        ...GatewayCoreSession
        __typename
      }
      __typename
    }
  }
  ${GATEWAY_CORE_SESSION_FRAGMENT}
`;

export interface AuthenticateUserVariables {
  username: string;
  password: string;
  twofactorauth?: string;
}

export interface AuthenticateUserResponse {
  authenticate: {
    username_and_password: {
      token: string;
      expires: number;
      user: {
        id: string;
        firstName: string;
        lastName: string;
        country: string;
        email: string;
        role: string;
        steps_required?: string[];
        company?: {
          id: string;
          name: string;
          api_type?: string;
        };
      };
      zendesk_token?: string;
      b2c_token?: string;
    };
  };
}

export const authenticateUser = async (
  username: string,
  password: string,
  twofactorauth?: string
): Promise<AuthenticateUserResponse['authenticate']['username_and_password']> => {
  const { data } = await authClient.query<AuthenticateUserResponse, AuthenticateUserVariables>({
    query: AUTHENTICATE_USER,
    variables: { username, password, twofactorauth },
    fetchPolicy: 'network-only', // Always fetch fresh data for authentication
  });

  return data.authenticate.username_and_password;
};

export default authClient;
