import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import {filterTypo } from '../store/actions'
import { filtrar } from "../store/actions"

export default function FilterType(){
  
    let type =useSelector((state)=>state.filterType)
    // console.log(pokemon)
    let dispatch=useDispatch()
    useEffect(()=>{
        dispatch(filterTypo())
    },[])

    function onSelecet(e){
        dispatch(filtrar(e.target.value))
    }
   
    return <div>
      <select className="select" onChange={onSelecet} >
  {
      (type.length!=0)?
      <>
          {   type.map((type)=>{                  
        return    <option value={type.name}>{type.name}</option>

           })}</>:<option >cargando</option>
        }
    </select>
  </div>

}