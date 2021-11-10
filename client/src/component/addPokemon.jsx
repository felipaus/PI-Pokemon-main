import "../css/pokemons.css"
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

  
    const [error,setError]=useState({
        name:"tiene que ingresar un nombre",
    })
    const [pokemon,setPokemon]=useState({
        name:"",
        img:"",
        vida:"",
        fuerza:"",
        velocidad:"",
        altura:"",
        peso:"",
    })

   

    function validate (x,y){
        if([y]=="name"){
            if(/\S+/.test(x)){
                setError({
                    ...error,
                    [y]:" "
                })

            }else{
                setError({
                    ...error,
                    [y]: "tiene que ingresar un nombre"
                })                    
            }            
        }
        
        if([y]!="name"){
        if(/^\d+(\.\d{1,2})?$/.test(x)){
                setError({
                    ...error,
                    [y]:" "
                })
            }else{
                setError({
                    ...error,
                    [y]: y+" tiene que se numero"
                })
            }
        }}
    
    function onInputChange(e){
        setPokemon((prevState)=>{
            const  newPokemon={
                ...prevState,
                [e.target.name]:e.target.value
            }
            
        validate(newPokemon[e.target.name],e.target.name)

        return newPokemon
        })

    }
    function onSubmit(e){   
          
        e.preventDefault()//le decimos que no se re cargar la pagina 
        // console.log(pokemon)
        axios.post("http://localhost:3001/api/pokemon/",pokemon).then(
            setPokemon({
                name:"",
                img:"",
                vida:"",
                fuerza:"",
                velocidad:"",
                altura:"",
                peso:"",
            })  
        ).catch(
            setError({
                name:error.name,
                img:"",
                vida:error.vida,
                fuerza:error.fuerza,
                velocidad:error.velocidad,
                altura:error.altura,
                peso:error.peso,
            })  
        )
        
    }
    return <form className="Formulario" > 
    <h1>Crea un pokemon</h1>   
    {error.name && <h2>{error.name}</h2>} 
    <label htmlFor="">Nombre</label>
    <input onChange={onInputChange} name="name"type="text" value={pokemon.name} placeholder="Nombre"/>    
    <label htmlFor="">Imagen</label>
    <input onChange={onInputChange} name="img"type="text" value={pokemon.img} placeholder="Url de Imagen"/>
    <label htmlFor="">HP</label> 
    {error.vida && <h2>{error.vida}</h2>}   
    <input onChange={onInputChange} name="vida"type="text" value={pokemon.vida} placeholder="Vida" />
    <label htmlFor="">Atack</label>
    {error.fuerza && <h2>{error.fuerza}</h2>}  
    <input onChange={onInputChange} name="fuerza"type="text" value={pokemon.fuerza} placeholder="Fuerza "/>
    <label htmlFor="">Speed</label>
    {error.velocidad && <h2>{error.velocidad}</h2>}  
    <input onChange={onInputChange} name="velocidad"type="text" value={pokemon.velocidad} placeholder="Velocidad " />
    <label htmlFor="">Altura</label>
    {error.altura && <h2>{error.altura}</h2>}  
    <input onChange={onInputChange} name="altura"type="text" value={pokemon.altura} placeholder="Altura "/>
    <label htmlFor="">Peso</label>
    {error.peso && <h2>{error.peso}</h2>}  
    <input onChange={onInputChange} name="peso"type="text" value={pokemon.peso} placeholder="Peso "/> 
    <label htmlFor="">Tipo</label>    
    <select className="selected" name="type1" onChange={onInputChange} value={pokemon.type1}>
        {
        (type.length!=0)?
        <>
        <option value="vacio">Tipos</option>
        {
            
        type.map((type)=>{
            return    <option value={type.name}>{type.name}</option>
        })}</>:<option >cargando...</option>
        }
    </select>       
    <button className="divboton" onClick={ onSubmit}  value="Cargar" >Agregar Pokemon</button>
</form>
        }

