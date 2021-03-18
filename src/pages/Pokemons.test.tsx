import { MockedProvider } from '@apollo/client/testing';
import { Pokemons } from './Pokemons';
import { QUERY_GET_LIST_POKEMONS } from '../graphql/queries';
import { act, getByText, render, screen, wait, waitFor } from '@testing-library/react';
import { createMockClient } from "mock-apollo-client";
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
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Pokemons />
      </MockedProvider>
    )

    expect(container.getElementsByClassName('title').length).toBe(1);
    expect(container.getElementsByClassName('loading-text').length).toBe(1);
  });
})


