import gql from "graphql-tag";

export const QUERY_GET_LIST_POKEMONS = gql`
  query($limit: Int = 10, $offset: Int = 0){
    pokemons(limit: $limit, offset: $offset){
      next
      nextOffset
      params
      results{
        name url image id
      }
    }
  }
`

export const QUERY_GET_POKEMON = gql`
  query ($name: String!){
    pokemon(name: $name){
      id
      name
      message
      height
      weight
      moves{
        move{
          url
          name
        }
      }
      abilities{
        ability{
          name
          url
        }
      }
      stats{
        base_stat
        effort
        stat{
          url
          name
        }
      }
    }
  }
`