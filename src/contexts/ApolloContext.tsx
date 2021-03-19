import { createContext, useReducer, useContext } from "react";

type AbilityTypes = {
  __typename: string,
  ability: {
    __typename: string,
    url: string,
    name: string
  }
}
type StatTypes = {
  __typename: string,
  base_stat: number,
  effort: number,
  stat: {
    __typename: string,
    url: string,
    name: string
  }
}

type MoveTypes = {
  __typename: string,
  move: {
    __typename: string,
    url: string,
    name: string
  }
}

export interface PokemonTypes {
  name: string,
  url: string,
  image: string,
  id: number,
  __typename?: string,
  message?: string,
  height?: number,
  weight?: number,
  moves?: MoveTypes[],
  abilities?: AbilityTypes[],
  stats?: StatTypes[]
}

export interface InitialStateTypes {
  pokemons: PokemonTypes[],
}

interface ActionTypes {
  payload: any,
  type: any
}

export const PokeContext = createContext({
  myPokemons: [],
  selectedPokemon: {},
  dispatch: (action: ActionTypes) => { },
});

const INITIAL_STATE = {
  myPokemons: [],
  selectedPokemon: {},
}

const PokeReducer = (state = INITIAL_STATE, action: ActionTypes) => {
  switch (action.type) {
    default:
      return state
  }
}

export const PokeProvider = ({ children }: any): any => {
  const [state, dispatch] = useReducer(PokeReducer, INITIAL_STATE);

  return (
    <PokeContext.Provider value={{
      myPokemons: state.myPokemons,
      selectedPokemon: state.selectedPokemon,
      dispatch
    }}>
      {children}
    </PokeContext.Provider>
  )
}
