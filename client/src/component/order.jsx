import { useDispatch } from "react-redux"
import { sort } from "../store/actions"

export default function Order(){

    const dispatch=useDispatch()

    function onSelecet(e){
        dispatch(sort(e.target.value))
    }

    return <select className="select" onChange={onSelecet}>
    <option value="ascendente">Ascendente</option>
    <option value="descendente">Descendente</option>
    </select>

}