import { useContext } from "react";
import { PokeContext } from "../contexts/ApolloContext";

export const useDataContext = () => {
  const { pokemons, dispatch } = useContext(PokeContext);

  return { pokemons, dispatch }
}