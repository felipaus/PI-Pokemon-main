import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router"

export default  function PokemonsDetalle(){

    const[pokemon, setPokemon]=useState(null)
    let {id}=useParams()
    useEffect(()=>{
        axios.get("https://pokeapi.co/api/v2/pokemon/"+id).then((res)=>{
            setPokemon(res.data)
        })
        return()=>{
            setPokemon(null)//Cleanup, si trabajamos con redux
        }
    },[])
    return <div className="card" >
        {
        pokemon?        
        <>   
        <h3> {pokemon.id}</h3>     
        <h3>{pokemon.name}</h3>
        <img src={pokemon.sprites.front_default} alt={pokemon.sprites.front_default}/>
        </>:
        <div>Loading</div>
        }
        
       
    </div>
}
