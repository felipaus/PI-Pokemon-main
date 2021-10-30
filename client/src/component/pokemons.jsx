import "../css/pokemons.css";
import { Link } from "react-router-dom"

export default  function Pokemons({name, vida, fuerza, velocidad, altura, peso, img,id}){

    return <div className="card" >
        <Link to={`/${id}`}>
        <h3>{name}</h3>
        <img src={ img} alt={img}/>
        </Link>
      
    </div>
}
