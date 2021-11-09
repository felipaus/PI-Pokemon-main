import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router"

const colors = {
	fire: '#FF8C00',
	grass: '#008000',
	electric: '#FFFF00',
	water: '#00FFFF',
	ground: '#800000',
	rock: '#808080',
	fairy: '#FF00FF',
	poison: '#800080',
	bug: '#00FF00',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#000000'
};



export default  function PokemonsDetalle(){
    const[pokemon, setPokemon]=useState(null)
    let {id}=useParams()
     function renderNotFund(){
         setPokemon({
             name:"No existe este Pokemon",
             img:"https://p4.wallpaperbetter.com/wallpaper/496/306/379/pokemon-dark-pikachu-sad-lonely-realistic-drawn-stylized-1280x800-anime-pokemon-hd-art-wallpaper-preview.jpg",
             id:"0",
            })
         
    }
    useEffect(()=>{
        axios.get("http://localhost:3001/api/pokemon/"+id).then((res)=>{
            setPokemon(res.data)
        }).catch(err=>renderNotFund())
        return()=>{
            setPokemon(null)//Cleanup, si trabajamos con redux
        }
    },[])
    function mostrar(x){
        
        if(x){
            let len=x.length
        if(len==2){
            return x[1].type.name
        }

        }
        
    }
    return <div className="card" >
        {
        pokemon?        
        <>  
        <div>
        <h1 >{pokemon.name}</h1>
        <h3 style={{borderColor:colortipe(pokemon.type1), color: colortipe(pokemon.type1) }}>{pokemon.type1}</h3>
        <h3 style={{borderColor:colortipe(mostrar(pokemon.type2)), color: colortipe(mostrar(pokemon.type2)) }}>{mostrar(pokemon.type2)}</h3> 
        <h2>#{pokemon.id
        .toString()
        .padStart(3, '0')}</h2>   
        <img  className="imgCont" src={pokemon.img} alt={pokemon.img}/>
        </div> 
        <div className="stats">
            <h1>Stats</h1>
       <div  className="texst">HP        
        <progress  className="post" max="100" value ={pokemon.vida }>vida</progress>
        </div>
        <div className="texst">Attack
        <progress  className="post" max="100" value ={pokemon.fuerza }>fuerz</progress>
        </div>
        <div className="texst">speed
        <progress  className="post" max="100" value ={pokemon.velocidad }></progress>
        </div>
        <div className="texst">height
        <progress className="post"  max="100" value ={pokemon.altura }></progress>
        </div>
        <div className="texst">weight
        <progress  className="post" max="100" value ={pokemon.peso }></progress>
        </div>
        </div>     
        </>:
        <div>Loading</div>
        }       
    </div>
}

export  function colortipe(x){
    return colors[x]
}