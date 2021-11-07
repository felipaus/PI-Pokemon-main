import "../css/Paginado.css"
import { useDispatch } from "react-redux"
import { paginado } from "../store/actions"

export default function Paginado(){

    const dispatch=useDispatch()

    function onSelecet(e){
        dispatch(paginado(e.target.value))
    }

    // return <select className="select" onChange={onSelecet}>
    // <option value="Anterior">Anterior</option>
    // <option value="Siguiente">Siguiente</option>
    // </select>
    
    return <div>
        <button className="pag" onClick={onSelecet} value="Anterior">←</button>
        <button  className="pag" onClick={onSelecet} value="Siguiente">→</button>

    </div>

}