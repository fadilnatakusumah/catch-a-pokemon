import { useContext } from "react";
import { PokeContext } from "../contexts/ApolloContext";

export const useDataContext = () => {
  const { myPokemons, dispatch } = useContext(PokeContext);

  return { myPokemons, dispatch }
}