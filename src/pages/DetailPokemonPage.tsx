import { useApolloClient } from "@apollo/client"
import styled from "@emotion/styled";
import { Fragment, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { FaStar } from "react-icons/fa";

import { QUERY_GET_POKEMON } from "../graphql/queries"
import { Wrapper } from "../components/Wrapper";
import { ImageGetColor } from "../components/ImageGetColor";
import { PokemonTypes } from "../@types/context";
import { useDataHook } from "../utils/hooks";
import { PokeBall, PokeBallImage } from "../components/PokeBall";
import { useModal } from "../components/Modal";
import { InputPreview } from "./ActionPage";

const DetailPokemonPageStyled = styled.div<{ bgColor: string }>`
  background-color: ${(props: any) => props.bgColor || "#F6F8FA"};
  min-height: 100vh;
  transition: .5s;

  .card{
    margin-top: 50px;

    >.loading-text{
      text-align: center;
      margin: 20px 0;
    }

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
      padding: 20px 20px 0 20px;
      margin: 18px;
      margin-bottom: 145px;

      &__image{
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translateY(-65px);

        >h4{
          display: flex;
          gap: 10px;
          text-transform: capitalize;
          margin-top: 15px;
        }
      }

      &__description{
        transform: translateY(-40px);
        >.pokemon-size{
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

        >.pokemon-abilities{
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

        >.pokemon-moves{
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
  }
`

export const DetailPokemonPage = (props: RouteComponentProps | any) => {
  const client = useApolloClient();
  const { name } = props.match.params as any;
  const { state } = props.location;
  // const { WrapperModal, onToggleModal } = useModal();
  const [isLoading, setLoading] = useState(false);
  const { isAlreadyExist, updatePokemon } = useDataHook();
  const [pokemonName, setPokemonName] = useState("")
  const [pokemon, setPokemon] = useState<PokemonTypes>({
    name: "",
    image: "",
    url: "",
    id: 1,
  });
  const [colors, setColors] = useState(["#F6F8FA"]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!state?.pokemon) {
        return props.history.push('/')
      }

      if (state.isNew) {
        const { data } = await client.query({
          query: QUERY_GET_POKEMON,
          variables: { name },
        });
        const concatData = { ...data, pokemon: { ...data.pokemon, ...state.pokemon } }
        setPokemon(concatData.pokemon);

      } else {
        setPokemon(state.pokemon);
      }
      setLoading(false);
    })()
  }, [])


  const onClickPokeBallHandler = () => {
    if (isAlreadyExist(pokemon) && !state?.isNew) {
      return props.history.push({
        pathname: '/my-action',
        state: {
          pokemon,
          isReleasing: true,
          isSuccessful: false,
        }
      })
    }
    props.history.push({
      pathname: '/my-action',
      state: {
        pokemon,
        isCatching: true,
        isSuccessful: false,
      }
    })
  }

  const onToggleInput = () => {
    if (pokemon.name?.toLowerCase() === pokemonName.toLowerCase()) return;
    if (isAlreadyExist({ ...pokemon, name: pokemonName })) return;

    const newPokemon = { ...pokemon, name: pokemonName };
    updatePokemon(pokemon, newPokemon);
    props.history.replace(
      props.history.location.pathname,
      {
        pokemon: newPokemon
      })
  }

  return (
    <DetailPokemonPageStyled bgColor={colors[0]}>
      <Wrapper title={pokemon.name}>
        <div className="card">
          {/* <WrapperModal>
            <div className="form-card">
              <h3>Hoorey! You already catch this pokemon</h3>
              <input placeholder="Select New Name" />
            </div>
          </WrapperModal> */}

          {(isLoading || !pokemon.name)
            ? (
              <div className="loading-text">
                <PokeBallImage />
                <h1>Loading...</h1>
              </div>
            )
            :
            <Fragment>
              <div className="content">
                <div className="content__image">
                  <ImageGetColor src={pokemon.image} callback={setColors} width="200" />
                  <InputPreview
                    editable={!state?.isNew}
                    initialValue={pokemon.name}
                    onChange={((value) => setPokemonName(value))}
                    onToggle={onToggleInput}
                  />
                  <h4>
                    <span><FaStar color={colors[0]} /></span>
                    {pokemon.abilities && pokemon.abilities[0].ability.name}
                  </h4>
                </div>
                <div className="content__description">
                  <ul className="pokemon-size">
                    <li>
                      <h3 style={{ color: colors[0] }}>Height</h3>
                      <h4>{pokemon.height}m</h4>
                    </li>
                    <li>
                      <h3 style={{ color: colors[0] }}>Weigth</h3>
                      <h4>{pokemon.weight}kg</h4>
                    </li>
                  </ul>
                  <div className="pokemon-abilities">
                    <h3>Abilities: </h3>
                    <ul>
                      {pokemon.abilities?.map(({ ability }, idx) => (
                        <li key={idx}>
                          {ability.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pokemon-moves">
                    <h3>Moves: </h3>
                    <ul>
                      <Fragment>
                        {pokemon.moves?.map(({ move }, idx) => (
                          <li key={idx}>
                            {move.name}
                          </li>
                        ))}
                      </Fragment>
                      <Fragment>
                        {pokemon.moves?.map(({ move }, idx) => (
                          <li key={idx}>
                            {move.name}
                          </li>
                        ))}
                      </Fragment>
                    </ul>
                  </div>
                </div>
              </div>
            </Fragment>
          }
          {!isLoading &&
            <PokeBall
              isCatching={state?.isNew}
              onClick={onClickPokeBallHandler}
            />}
        </div>
      </Wrapper>
    </DetailPokemonPageStyled>
  );
}

export default DetailPokemonPage;
