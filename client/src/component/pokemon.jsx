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

    function mostrar(x){
        let len=x.length
        if(len==2){
            return x[1].type.name
        }
    }

    return <div className="Lista">
        {
        (pokemon.length!=0)?
        <>
        {pokemon.map((pokemo)=>{
            
            return <Pokemons name={pokemo.name} img={pokemo.img} id={pokemo.id} type={pokemo.type1} type2={mostrar(pokemo.type2)} />
        })} </>:
        <div>Cargando</div>
        }
        </div>
}