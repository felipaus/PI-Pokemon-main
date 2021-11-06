import { useDispatch } from "react-redux"
import { fuerza } from "../store/actions"

export default function FilterFuerza(){
    let dispatch=useDispatch()
    
    
    function onSelecet(e){
        dispatch(fuerza(e.target.value))
    }
    return <div>
        <select className="select" onChange={onSelecet} > 
            <option value="Mayor">Mayor Fuerza</option>
            <option value="Menor">Menor Fuerza</option>
        </select>
    </div>

}