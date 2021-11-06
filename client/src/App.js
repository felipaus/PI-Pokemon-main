import "./App.css";
import { Route, Switch } from "react-router";
import Pokemon from "./component/pokemon";
import SearchBar from "./component/SearchBar";
import PokemonsDetalle from "./component/pokeDetall";
import Inicio from "./component/inicio";
import Order from "./component/order";
import  AddPokemon  from "./component/addPokemon";
import FilterType from "./component/filterType";
import Paginado from "./component/paginado";
import FilterCreador from "./component/creador";
import FilterFuerza from "./component/filterFuerza";
import Nav from "./component/Nav";


function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Inicio />
      </Route>
      <Switch>      
        <Route exact path="/add"> 
          <Nav path="/" />              
          <AddPokemon className="add"/>        
        </Route>         
        <Route exact path="/pokemon">
          <Nav path="/" />   
          <SearchBar className="Buscar" />        
          <input type="checkbox" calss="cheak" className="chek" id="cheak"/>
          <label className="menu" for="cheak">|||</label>
          <div className="Control"> 
            <FilterType />          
            <FilterCreador />
            <FilterFuerza />
            <Order />
          </div>
          <Paginado/>
          <Pokemon />
        </Route>
        <Route exact path="/:id">
          <Nav path="/" />
          <PokemonsDetalle />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
