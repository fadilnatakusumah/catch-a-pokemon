import { useQuery } from "@apollo/client"
import { QUERY_GET_LIST_POKEMONS } from "../graphql/queries"
import styled from "@emotion/styled";
import { Wrapper } from "../components/Wrapper";
import { PokemonTypes } from "../contexts/ApolloContext";
import PokemonRow from "../components/PokemonRow";

const PokemonsPage = styled.div`
  background-color: #F6F8FA;
  min-height: 100vh;

  .title{
    text-align: center;
    padding: 20px;
    text-transform: uppercase;
    font-weight: bold;
    color: #a0a0a0;
  }

  .list-pokemons{
    padding: 0 20px;
  }
`

interface ListResponseTypes<T> {
  pokemons: {
    __typename: string,
    results: T[]
  }
}

export const Pokemons = () => {
  const { data, loading } = useQuery<ListResponseTypes<PokemonTypes>>(QUERY_GET_LIST_POKEMONS);
  return (
    <PokemonsPage>
      <Wrapper>
        <div className="title">Choose your Pokemon</div>
        <div className="list-pokemons">
          {loading ? (
            <div className="loading-text">Loading...</div>
          ) : data?.pokemons.results.map((data) => <PokemonRow pokemon={data} key={data.id} />)}
        </div>
      </Wrapper>
    </PokemonsPage>
  )
}

