import styled from '@emotion/styled'
import { useHistory } from 'react-router'
import { PokemonTypes } from '../contexts/ApolloContext'

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
    transform: scale(1.05);
  }

  >div h1{
    color: #333;
    text-transform: capitalize;
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
  return (
    <PokemonRowStyled
      data-testid="pokemon-row"
      onClick={() => router.push(`/pokemon/${pokemon.id}`)}
    >
      <div>
        <h1>{pokemon.name}</h1>
      </div>
      <img src={pokemon.image} />
    </PokemonRowStyled>
  )
}

export default PokemonRow
