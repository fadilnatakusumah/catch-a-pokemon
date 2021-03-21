import { MockedProvider } from '@apollo/client/testing';
import { PokemonsPage } from './PokemonsPage';
import { QUERY_GET_LIST_POKEMONS } from '../graphql/queries';
import { render, act } from '@testing-library/react';
import { Router, useHistory } from 'react-router';
import { createMemoryHistory } from 'history';
import { GraphQLError } from 'graphql';

const mocks = [
  {
    request: {
      query: QUERY_GET_LIST_POKEMONS,
      variables: {
        name: 'Buck',
      },
    },
    result: {
      data: {
        "pokemons": {
          "results": [
            {
              "name": "ivysaur",
              "url": "https://pokeapi.co/api/v2/pokemon/2/",
              "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
              "id": 2
            },],
        },
      }
    },
  },
];

describe('Pokemons page', () => {
  it('renders without error', async () => {
    const history = createMemoryHistory()
    const { container, findByText, debug } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router history={history}>
          <PokemonsPage />
        </Router>
      </MockedProvider>
    )
    debug();

    expect(container.getElementsByClassName('title').length).toBe(1);
    expect(container.getElementsByClassName('loading-text').length).toBe(1);
  });
})


