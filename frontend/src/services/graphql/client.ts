import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import axios from 'axios'

const AUTH_URL = 'https://auth.staging.ultra.io/auth/realms/ultraio/protocol/openid-connect/token'
const GRAPHQL_URL = 'https://staging.api.ultra.io/graphql'

// Function to get the auth token
const getAuthToken = async () => {
  try {
    const response = await axios.post(
      AUTH_URL,
      {
        client_id: import.meta.env.VITE_ULTRA_CLIENT_ID,
        client_secret: import.meta.env.VITE_ULTRA_CLIENT_SECRET,
        grant_type: 'client_credentials',
        redirect_uri: import.meta.env.VITE_ULTRA_REDIRECT_URI,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    return response.data.access_token
  } catch (error) {
    console.error('Error getting auth token:', error)
    return null
  }
}

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
})

const authLink = setContext(async (_, {headers}) => {
  const token = await getAuthToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'x-apollo-operation-name': 'ultratimes',
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})