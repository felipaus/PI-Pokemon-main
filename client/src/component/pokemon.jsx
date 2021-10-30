import "../css/pokemons.css";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {fetchPokemon } from '../store/actions'
import Pokemons from "./pokemons"

export default  function Pokemon(){
    let pokemon =useSelector((state)=>state.pokemon)//le digo lo que quiero traer del reduce(en este caso pokemon)
    // console.log(pokemon)
    let dispatch=useDispatch()//con esto depacho una funcion
    useEffect(()=>{//ejecutar una funcion cuando el ciclo de vida recien empieza 
        dispatch(fetchPokemon())//le digo que me ejecuta la funncion de action fetchPokemon
    },[])
   
    return <div className="Lista">
        {
            
            (pokemon.length!=0)?
            <>
              {  pokemon.map((pokemo)=>{                   
            return <Pokemons name={pokemo.name} img={pokemo.img} id={pokemo.id}/>      
        })} </>:
        <div>Cargando</div>
            
        }
      
    </div>
}