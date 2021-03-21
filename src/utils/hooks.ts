import createPersistedState from 'use-persisted-state';
import { InitialStateTypes, PokemonTypes } from '../@types/context';

const useMyPokemonState = createPersistedState('my-pokemon-state');

const INITIAL_STATES = {
  myPokemons: []
}

export const useDataHook = () => {
  const [state, setState] = useMyPokemonState<InitialStateTypes>(INITIAL_STATES);

  const savePokemon = (pokemon: PokemonTypes): void => {
    const newState = [...state.myPokemons, pokemon];
    setState({ myPokemons: newState });
  }

  const updatePokemon = (oldPokemon: PokemonTypes, newPokemon: PokemonTypes) => {
    const newState = state.myPokemons.map((pokemon) => {
      if (pokemon.id === oldPokemon.id && pokemon.name.toLowerCase() === oldPokemon.name.toLowerCase()) {
        return newPokemon;
      }
      return pokemon;
    });
    setState({ myPokemons: newState })
  }

  const releasePokemon = (pokemon: PokemonTypes): void => {
    const newState = state.myPokemons.filter(({ name, id }) => name.toLowerCase() !== pokemon.name.toLowerCase() && id === pokemon.id);
    setState({ myPokemons: newState });
  }

  const isAlreadyExist = (pokemmon: PokemonTypes): PokemonTypes | undefined => {
    return state.myPokemons.find(({ name }) => pokemmon.name.toLowerCase() === name.toLowerCase());
  }

  const ownedLength = (pokemon: PokemonTypes): number => {
    return state.myPokemons.filter(({ id }) => pokemon.id === id).length || 0
  }

  return { myPokemons: state.myPokemons, savePokemon, releasePokemon, isAlreadyExist, ownedLength, updatePokemon }
}