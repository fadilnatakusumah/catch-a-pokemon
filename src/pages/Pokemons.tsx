import { useQuery } from "@apollo/client"
import styled from "@emotion/styled";
import Helmet from "react-helmet";

import { QUERY_GET_LIST_POKEMONS } from "../graphql/queries"

import { Wrapper } from "../components/Wrapper";
import { PokemonTypes } from "../contexts/ApolloContext";
import PokemonRow from "../components/PokemonRow";
import { Fragment, useEffect, useState } from "react";

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

  .loading-text{
    font-size: 1.5em;
    text-align: center;
    color: #333;
  }

  .loading-more{
    text-align:center;
    user-select: none;
    >button {
      user-select: none;
      border: none;
      padding: 5px 10px;
      background-color: #ccc;
      border-radius: 5px;
      transition: .5s;

      &:hover{
        transform: scale(1.1);
      }

    }
  }
`

export interface ListResponseTypes {
  pokemons: {
    next: string,
    nextOffset: number,
    params: {
      limit: number,
      offset: number,
    }
    results: PokemonTypes[]
  }
}

export const Pokemons = () => {
  const [isLoadMore, setIsLoadMore] = useState(false);
  const { data, loading, fetchMore } = useQuery<ListResponseTypes>(QUERY_GET_LIST_POKEMONS, {
    variables: {
      limit: 10,
      offset: 0,
    },
  });

  function onLoadMoreHandler() {
    setIsLoadMore(true);
    fetchMore({
      variables: {
        limit: 10,
        offset: data?.pokemons.nextOffset,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        setIsLoadMore(false);
        if (!fetchMoreResult) return prev;
        return {
          pokemons: {
            ...prev.pokemons,
            ...fetchMoreResult.pokemons,
            results: [...prev.pokemons.results, ...fetchMoreResult.pokemons.results]
          }
        }
      }
    })
  }

  return (
    <PokemonsPage>
      <Wrapper title="Home">
        <div className="title">Choose your Pokemon</div>
        <div className="list-pokemons">
          {loading ? (
            <div className="loading-text">Loading...</div>
          ) :
            (
              <Fragment>
                <Fragment>
                  {data?.pokemons.results.map((data) => <PokemonRow pokemon={data} key={data.id} />)}
                </Fragment>
                <Fragment>
                  {data?.pokemons.nextOffset && (
                    <div className="loading-more">
                      <button disabled={isLoadMore} onClick={onLoadMoreHandler}>{isLoadMore ? "Loading more.." : "Load more"}</button>
                    </div>
                  )}
                </Fragment>
              </Fragment>
            )}
        </div>
      </Wrapper>
    </PokemonsPage>
  )
}

