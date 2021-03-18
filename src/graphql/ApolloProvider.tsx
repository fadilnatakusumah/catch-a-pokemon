import { ApolloProvider } from "@apollo/react-hooks"
import { ApolloClient, InMemoryCache } from "@apollo/client"
import { createHttpLink } from "apollo-link-http"
import App from "../App";

const GRAPHQL_URL = "https://graphql-pokeapi.vercel.app/api/graphql";

const httpLink = createHttpLink({
  uri: GRAPHQL_URL
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink as any
})

export const ApolloProviderApp = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}

