import { useQuery } from "@apollo/client"
import styled from "@emotion/styled";

import { QUERY_GET_LIST_POKEMONS } from "../graphql/queries"

import { Wrapper } from "../components/Wrapper";
import PokemonRow from "../components/PokemonRow";
import { Fragment, useState } from "react";
import { ListResponseTypes, PokemonTypes } from "../@types/context";
import { useDataHook } from "../utils/hooks";
import { CgPokemon } from "react-icons/cg";
import { useHistory } from "react-router";

const MyPokemonsPageStyled = styled.div`
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
    padding: 20px;
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
      cursor: pointer;
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

export const MyPokemonsPage = () => {
  const { myPokemons } = useDataHook();
  const history = useHistory();

  const goToDetail = (pokemon: PokemonTypes) => {
    history.push(`pokemon/${pokemon.name}`, { pokemon, isNew: false })
  }

  return (
    <MyPokemonsPageStyled>
      <Wrapper title="Home">
        <div className="list-pokemons">
          {
            myPokemons.length > 0
              ? myPokemons.map((data) => (
                <PokemonRow
                  hideCount
                  onClick={() => goToDetail(data)}
                  pokemon={data}
                  key={`${data.name}_${data.id}`}
                />
              ))
              : (
                <div style={{ padding: '30px', minHeight: '200px', textAlign: 'center', fontSize: '2em' }}>
                  <CgPokemon />
                  <p>You haven't catch a pokemon yet</p>
                </div>
              )
          }
        </div>
      </Wrapper>
    </MyPokemonsPageStyled>
  )
}


export default MyPokemonsPage;