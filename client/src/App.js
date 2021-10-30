import "./App.css";
import { Route, Switch } from "react-router";
import Pokemon from "./component/pokemon";
import SearchBar from "./component/SearchBar";
import PokemonsDetalle from "./component/pokeDetall";
import Inicio from "./component/inicio";
import Order from "./component/order";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Inicio />
      </Route>
      <Switch>
        <Route exact path="/pokemon">
          <SearchBar />
          <Order/>
          <Pokemon />
        </Route>
        <Route exact path="/:id">
          <PokemonsDetalle />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
