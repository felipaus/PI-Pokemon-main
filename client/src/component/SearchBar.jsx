import "../css/seachBar.css"
import { useState } from "react";
import { searchPokemon } from "../store/actions";
import { useDispatch } from "react-redux"


export default function SearchBar() {
  const [search, setSearch] = useState(""); //estado inicual
  let dispatch=useDispatch()
  

  function onSubmit() {
    dispatch(searchPokemon(search)) 
  }
  function onInputChange(e) {
    setSearch(e.target.value);
     //le digo que cuando cambie algo lo guarde en el setSerch
  }

  return (
    <div className="search">
        <input className="searchTerm" type="text" onChange={onInputChange} value={search} />
        <button  className="searchButton" onClick={onSubmit}  value="Buscar" >Buscar</button>     
    </div>
  );
}
