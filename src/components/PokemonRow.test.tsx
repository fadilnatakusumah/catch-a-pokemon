import { PokemonRow } from './PokemonRow';
import { render } from '@testing-library/react';

describe('Pokemon row', () => {
  it('renders correctly', async () => {
    const dummyProps = {
      "name": "ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon/2/",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
      "id": 2
    }
    const { findByText } = render(<PokemonRow pokemon={dummyProps} />)
    const comp = await findByText("ivysaur")
    expect(comp).toBeInTheDocument();
  });
})


