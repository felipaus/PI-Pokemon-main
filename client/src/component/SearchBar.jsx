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
    <div>
        <input type="text" onChange={onInputChange} value={search} />
        <button  onClick={onSubmit}  value="Buscar" >Buscar</button>     
    </div>
  );
}
