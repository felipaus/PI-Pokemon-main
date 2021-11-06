import { useDispatch } from "react-redux"
import { creador } from "../store/actions"


export default function FilterCreador(){  
    let dispatch=useDispatch()
    
    
    function onSelecet(e){
        dispatch(creador(e.target.value))
    }
    return <div>
        <select className="select" onChange={onSelecet} > 
        <option value="All">All</option>
            <option value="Create">Create by me</option>
            <option value="Origin">Origin</option>
        </select>
    </div>

}