import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterTypo } from "../store/actions"


export default function AddPokemon(){
    let type =useSelector((state)=>state.filterType)

    let dispatch=useDispatch()
    useEffect(()=>{
        dispatch(filterTypo())
    },[])

  
    const [error,setError]=useState({})
    const [pokemon,setPokemon]=useState({
        name:"",
        img:"",
        vida:"",
        fuerza:"",
        velocidad:"",
        altura:"",
        peso:"",
    })
    
    function onInputChange(e){
        setPokemon((prevState)=>{
            const  newPokemon={
                ...prevState,
                [e.target.name]:e.target.value
            }
        

        // setError(validate(newPokemon))

        return newPokemon
        })

    }
    function onSubmit(e){   
          
        e.preventDefault()//le decimos que no se re cargar la pagina 
        // console.log(pokemon)
        axios.post("http://localhost:3001/api/pokemon/",pokemon)
        setPokemon({
            name:"",
            img:"",
            vida:"",
            fuerza:"",
            velocidad:"",
            altura:"",
            peso:"",
        })  
    }
    return <form className="Formulario" > 
    <h1>Crea un pokemon</h1>    
    <label htmlFor="">Nombre</label>
    <input onChange={onInputChange} name="name"type="text" value={pokemon.name} placeholder="Nombre"/>      
    <label htmlFor="">Imagen</label>
    <input onChange={onInputChange} name="img"type="text" value={pokemon.img} placeholder="Url de Imagen"/>
    <label htmlFor="">HP</label>    
    <input onChange={onInputChange} name="vida"type="text" value={pokemon.vida} placeholder="Vida" />
    <label htmlFor="">Atack</label>
    <input onChange={onInputChange} name="fuerza"type="text" value={pokemon.fuerza} placeholder="Fuerza "/>
    <label htmlFor="">Speed</label>
    <input onChange={onInputChange} name="velocidad"type="text" value={pokemon.velocidad} placeholder="Velocidad " />
    <label htmlFor="">Altura</label>
    <input onChange={onInputChange} name="altura"type="text" value={pokemon.altura} placeholder="Altura "/>
    <label htmlFor="">Peso</label>
    <input onChange={onInputChange} name="peso"type="text" value={pokemon.peso} placeholder="Peso "/>
    <label htmlFor="">Tipo</label>
    <select className="selected" name="type1" onChange={onInputChange} value={pokemon.type1}>
        {
        (type.length!=0)?
        <>
        {
        type.map((type)=>{
            return    <option value={type.name}>{type.name}</option>
        })}</>:<option >cargando...</option>
        }
    </select>       
    <button className="divboton" onClick={ onSubmit}  value="Cargar" >Agregar Pokemon</button>
</form>
        }

export function validate (state){
let error={}
if(!state.name){
    error.name="necesto un nombre"
}else if(state.name == null || state.name.length == 0 || /^\s+$/.test(state.name) ){
    error.name="usario es invalido"
}
if(!state.vida){
    error.vida="necesto un valor numerico"
}else if(!/(typeof input.vida =="number")/.test(state.vida)){
    error.vida ="tiene que ser un numero entero"
}
}