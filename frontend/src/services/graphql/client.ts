import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import axios from 'axios'

const GRAPHQL_URL = 'https://staging.api.ultra.io/graphql'

const getAuthToken = async () => {
  try {
    const response = await axios.post('/api/auth/token')
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