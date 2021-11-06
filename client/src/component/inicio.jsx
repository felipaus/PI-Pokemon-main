import { Link } from "react-router-dom"
import "../css/pokebola.css";

export default  function Inicio(){

    return <div className="pokebola">
        <Link to={`/pokemon`}>
            {/* <img src="https://cdn.streamloots.com/uploads/5eb3db772a3fcd0035f7ff40/10172dc2-f05e-4804-948f-94ec8a1747ce.gif" alt="pokebola" /> */}
            <img class="static" src="https://cdn.streamloots.com/uploads/5eb3db772a3fcd0035f7ff40/10172dc2-f05e-4804-948f-94ec8a1747ce.gif"/>
            
    </Link>
    </div>
}