import { createContext, useReducer, useContext } from "react";

export interface PokemonTypes {
  name: string,
  url: string,
  image: string,
  id: number,
}
export interface InitialStateTypes {
  pokemons: PokemonTypes[]
}

interface ActionTypes {
  payload: any,
  type: any
}

export const PokeContext = createContext({
  pokemons: [],
  dispatch: (action: ActionTypes) => { },
});

const INITIAL_STATE = {
  pokemons: []
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
    <PokeContext.Provider value={{ pokemons: state.pokemons, dispatch }}>
      {children}
    </PokeContext.Provider>
  )
}
