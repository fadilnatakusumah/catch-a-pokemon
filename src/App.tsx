import { BrowserRouter as Router, Route } from "react-router-dom";
import { DetailPokemon } from "./pages/DetailPokemonPage";
import { MyPokemonsPage } from "./pages/MyPokemonsPage";
import { PokemonsPage } from "./pages/PokemonsPage";
import { ActionPage} from "./pages/ActionPage";
import "./App.css"

function App() {
  return (
    <Router>
      <Route exact path="/" component={PokemonsPage} />
      <Route exact path="/my-pokemons" component={MyPokemonsPage} />
      <Route exact path="/pokemon/:name" component={DetailPokemon} />
      <Route exact path="/my-action" component={ActionPage} />
    </Router>
  );
}

export default App;
