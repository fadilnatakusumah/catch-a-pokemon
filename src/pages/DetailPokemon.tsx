import { useQuery, useApolloClient } from "@apollo/client"
import styled from "@emotion/styled";
import { Fragment, useState } from "react";
import { RouteComponentProps } from "react-router";
import { FaStar } from "react-icons/fa";

import { QUERY_GET_LIST_POKEMONS, QUERY_GET_POKEMON } from "../graphql/queries"
import { ListResponseTypes } from "./Pokemons";
import { Wrapper } from "../components/Wrapper";
import { PokemonTypes } from "../contexts/ApolloContext";
import { ImageGetColor } from "../components/ImageGetColor";
import { Link } from "react-router-dom";

const DetailPokemonPage = styled.div<{ bgColor: string }>`
  background-color: ${(props: any) => props.bgColor || "#F6F8FA"};
  height: 100vh;
  transition: .5s;

  .card{
    position: relative;
    top: 50px;

    >img {
      position: absolute;
      right: -30px;
      top: -60px;
      width: 250px;
    }

    .content{
      background: #f9f9f9;
      border-radius: 8px;
      min-height: 300px;
      padding: 20px;
      margin: 0 18px;
      margin-bottom: 200px;

      &__name{
        h1,h4{
          display: flex;
          text-transform: capitalize;
          span{
            margin-right: 5px;
          }
        }
      }

      &__description{
        margin-top: 30px;
        display: flex;
        gap: 30px;
        list-style: none;

        h3{
          font-size: 1.1em;
        }

        h4{
          font-size: 1em;
        }
      }

      &__abilities{
        margin-top: 20px;
        h3{
          font-size: 1.1em;
          margin-bottom: 3px;
          color: ${props => props.bgColor ? props.bgColor : "#333"};
        }

        ul{
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;

          >li{
            text-transform: capitalize;
            padding: 3px 5px;
            background-color: ${props => props.bgColor ? props.bgColor : "#333"};
            color: white;
          }
        }
      }

      &__moves{
        margin-top: 20px;
        h3{
          margin-bottom: 3px;
          font-size: 1.1em;
          color: ${props => props.bgColor ? props.bgColor : "#333"};
        }

        ul{
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          >li{
            text-transform: capitalize;
            padding: 3px 5px;
            background-color: #f9f9f9;
            border: 1px solid #aaa;
            color: #333;
          }
        }
      }
    }
  }
`

interface DataPokemon {
  pokemon: PokemonTypes
}

export const DetailPokemon = (props: RouteComponentProps) => {
  const { name } = props.match.params as any;
  const [pokemon, setPokemon] = useState<PokemonTypes>({
    name: "",
    image: "",
    url: "",
    id: 1,
  });
  const client = useApolloClient();
  const [colors, setColors] = useState(["#F6F8FA"]);
  const { data, loading, error, updateQuery } = useQuery<DataPokemon>(QUERY_GET_POKEMON, {
    variables: { name },
    onCompleted(completeData) {
      const getDataFromCache = client.readQuery({ query: QUERY_GET_LIST_POKEMONS });
      if (!getDataFromCache) {
        alert("Please select your pokemon again");
        return props.history.push('/')
      }

      const dataFromCache = (getDataFromCache as ListResponseTypes).pokemons.results.find((p) => p.name === name);
      if (dataFromCache) {
        const concatData = { ...completeData, pokemon: { ...completeData.pokemon, ...dataFromCache } }
        setPokemon(concatData.pokemon);
      }
    }
  });

  return (
    <DetailPokemonPage bgColor={colors[0]}>
      <Wrapper title={pokemon.name}>
        <div className="card">
          {(loading || !pokemon.name)
            ? <h1 style={{ textAlign: 'center' }}>LOADING</h1>
            :
            <Fragment>
              <ImageGetColor src={pokemon.image} callback={setColors} width="200" />
              <div className="content">
                <div className="content__name">
                  <h1>{pokemon.name}</h1>
                  <h4>
                    <span><FaStar color={colors[0]} /></span>
                    {pokemon.abilities && pokemon.abilities[0].ability.name}
                  </h4>
                </div>
                <ul className="content__description">
                  <li>
                    <h3 style={{ color: colors[0] }}>Height</h3>
                    <h4>{pokemon.height}m</h4>
                  </li>
                  <li>
                    <h3 style={{ color: colors[0] }}>Weigth</h3>
                    <h4>{pokemon.weight}kg</h4>
                  </li>
                </ul>
                <div className="content__abilities">
                  <h3>Abilities: </h3>
                  <ul>
                    {pokemon.abilities?.map(({ ability }, idx) => (
                      <li key={idx}>
                        {ability.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="content__moves">
                  <h3>Moves: </h3>
                  <ul>
                    {pokemon.moves?.map(({ move }, idx) => (
                      <li key={idx}>
                        {move.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="navigation" style={{ position: 'fixed', bottom: 0 }}>
                <Link to="/">
                  <button>
                    Back
                  </button>
                </Link>
              </div>
            </Fragment>
          }
        </div>
      </Wrapper>
    </DetailPokemonPage>
  );
}

