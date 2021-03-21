import { BrowserRouter as Router, Route } from "react-router-dom";
import loadable from '@loadable/component';

import "./App.css";

const ActionPage = loadable(() => import('./pages/ActionPage'))
const DetailPokemonPage = loadable(() => import('./pages/DetailPokemonPage'))
const MyPokemonsPage = loadable(() => import('./pages/MyPokemonsPage'))
const PokemonsPage = loadable(() => import('./pages/PokemonsPage'))

function App() {
  return (
    <Router>
      <Route exact path="/" component={PokemonsPage} />
      <Route exact path="/my-pokemons" component={MyPokemonsPage} />
      <Route exact path="/pokemon/:name" component={DetailPokemonPage} />
      <Route exact path="/my-action" component={ActionPage} />
    </Router>
  );
}

export default App;
