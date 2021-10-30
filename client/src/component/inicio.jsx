import { Link } from "react-router-dom"

export default  function Inicio(){

    return <div >
        <Link to={`/pokemon`}>
        <h3>principal</h3>
        </Link>
      
    </div>
}