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
  it('renders component to the route', async () => {
    // const history = createMemoryHistory();
    // history.push('/pokemon/buck');
    const routersProps = {
      history: {},
      match: {
        params: {}
      },
      location: {}
    }
    const { container, getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DetailPokemon
          {...routersProps}
        />
      </MockedProvider>
    )
    // debug();

    expect(container.getElementsByClassName('loading-text').length).toBe(1);

    // await act(() => new Promise((res) => setTimeout(res, 2000)))
  
    // expect(container.getElementsByClassName('title').length).toBe(1);
  });
})


