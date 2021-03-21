export type AbilityTypes = {
  __typename: string,
  ability: {
    __typename: string,
    url: string,
    name: string
  }
}

export type StatTypes = {
  __typename: string,
  base_stat: number,
  effort: number,
  stat: {
    __typename: string,
    url: string,
    name: string
  }
}

export type MoveTypes = {
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
  myPokemons: PokemonTypes[],
}

export interface ActionTypes {
  payload: any,
  type: any
}

export interface ListResponseTypes {
  pokemons: {
    next: string,
    nextOffset: number,
    params: {
      limit: number,
      offset: number,
    }
    results: PokemonTypes[]
  }
}
