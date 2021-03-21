import { MockedProvider } from '@apollo/client/testing';
import { QUERY_GET_POKEMON } from '../graphql/queries';
import { render } from '@testing-library/react';
import { DetailPokemon } from './DetailPokemonPage';
import { MemoryRouter } from 'react-router';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

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

  it('renders component to the route', async () => {
    // const history = createMemoryHistory();
    // history.push('/pokemon/buck');
    const routersProps = {
      history: {},
      match: {
        params: {}
      },
      location: {
        state: {
          pokemon: {
            "id": 1,
            "name": "buck",
            "message": ""
          },
        }
      }
    }

    const { container, findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router history={history}>
          <DetailPokemon
            {...routersProps}
          />
        </Router>
      </MockedProvider>
    );

    const comp = await findByText("buck")
    expect(comp).toBeInTheDocument();
  });
})


