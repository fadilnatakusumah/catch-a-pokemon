import gql from "graphql-tag";

export const QUERY_GET_LIST_POKEMONS = gql`
  {
    pokemons{
      results{
        name url image id
      }
    }
  }
`