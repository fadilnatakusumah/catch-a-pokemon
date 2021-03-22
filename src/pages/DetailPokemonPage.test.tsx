import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { QUERY_GET_POKEMON } from '../graphql/queries';
import { DetailPokemonPage } from './DetailPokemonPage';

const mocks = [
  {
    request: {
      query: QUERY_GET_POKEMON,
      variables: {
        name: 'buck',
      },
    },
    result: {
      data: {
        "pokemon": {
          "id": 1,
          "name": "buck",
          "message": ""
        },
      }
    },
  },
];

describe('Pokemon detail page', () => {
  const history = createMemoryHistory()
  const routersProps = {
    history: {},
    match: {
      params: {}
    },
    location: {
      state: {
        isNew: false,
        pokemon: {
          "id": 1,
          "name": "buck",
          "message": ""
        },
      }
    }
  }
  it('renders component to the route', async () => {
    const { container, findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router history={history}>
          <DetailPokemonPage
            {...routersProps}
          />
        </Router>
      </MockedProvider>
    );

    const comp = await findByText("buck")
    expect(comp).toBeInTheDocument();
  });

  it("renders the pokeball correctly", async () => {
    const { findByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router history={history}>
          <DetailPokemonPage
            {...routersProps}
          />
        </Router>
      </MockedProvider>
    );

    const pokeball = await findByTestId("pokeball");
    expect(pokeball).toBeInTheDocument();
  })
})


