import { useDispatch } from "react-redux"
import { sort } from "../store/actions"

export default function Order(){

    const dispatch=useDispatch()

    function onSelecet(e){
        dispatch(sort(e.target.value))
    }

    return <select className="select" onChange={onSelecet}>
    
    <option value="ascendente">A-Z</option>
    <option value="descendente">Z-A</option>
    </select>

}