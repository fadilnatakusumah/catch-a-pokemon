import { BrowserRouter as Router, Route } from "react-router-dom";
import { DetailPokemon } from "./pages/DetailPokemon";
import { MyPokemons } from "./pages/MyPokemons";
import { Pokemons } from "./pages/Pokemons";

import { PokeProvider } from "./contexts/ApolloContext"

function App() {
  return (
    <PokeProvider>
      <Router>
        <Route exact path="/" component={Pokemons} />
        <Route exact path="/my-pokemons" component={MyPokemons} />
        <Route exact path="/pokemon/:id" component={DetailPokemon} />
      </Router>
    </PokeProvider>
  );
}

export default App;
