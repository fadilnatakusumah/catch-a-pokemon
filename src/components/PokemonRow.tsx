import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { PokemonTypes } from '../contexts/ApolloContext'
import { ColorExtractor } from 'react-color-extractor'
interface PokemonRowProps {
  pokemon: PokemonTypes
}

const PokemonRowStyled = styled.div`
  position: relative;
  background: white;
  padding: 20px 10px;
  box-shadow: 0px 2px 9px #ccc;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  transition: .2s;
  margin-bottom: 20px;

  &:hover{
    transition: .2s;
    transform: scale(1.05);
  }

  >div{
    h1{
      transition: .5s;
      /* --webkit-text-stroke: 2px #333; */
      /* text-shadow: -1px 0 #333, 0 1px #333, 1px 0 #333, 0 -1px #333; */
      color: #333;
      text-transform: capitalize;
    }

    h6{
      text-transform: uppercase;
      font-weight: 600;
      background-color: gold;
      width: fit-content;
      color: brown;
      padding: 2px 4px;
      border-radius: 15px;
    }
  }

  >img{
    position: absolute;
    right: -44px;
    top: -60px;
    height: 200px;
  }
`

export const PokemonRow = ({ pokemon }: PokemonRowProps) => {
  const router = useHistory();
  const [colors, setColors] = useState([]);

  return (
    <PokemonRowStyled
      data-testid="pokemon-row"
      onClick={() => router.push(`/pokemon/${pokemon.name}`)}
    >
      <div>
        <h1 style={{ color: colors[1] }}>{pokemon.name}</h1>
        <h6>Owned: 0</h6>
      </div>
      <ColorExtractor getColors={(colors: any) => setColors(colors)}>
        <img src={pokemon.image} />
      </ColorExtractor>
    </PokemonRowStyled>
  )
}

export default PokemonRow
