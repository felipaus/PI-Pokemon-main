import { useState } from "react";
import { searchPokemon } from "../store/actions";
import { useDispatch, useSelector } from "react-redux"


export default function SearchBar() {
  const [search, setSearch] = useState(""); //estado inicual
  let dispatch=useDispatch()
  

  function onSubmit() {
    
    // console.log(a)
    let a=dispatch(searchPokemon(search))
    console.log(a)
     //aca llamo al searchPokemon
    //  ()=>dispatch(searchPokemon(search))
  }
  function onInputChange(e) {
    //recibo un envento e
    setSearch(e.target.value);
     //le digo que cuando cambie algo lo guarde en el setSerch
     
  }

  
  return (
    <div>
    
      <h3>{search}</h3>
        <input type="text" onChange={onInputChange} value={search} />
        <button  onClick={ onSubmit}  value="Buscar" >Buscar</button>      
        
    </div>
  );
}
