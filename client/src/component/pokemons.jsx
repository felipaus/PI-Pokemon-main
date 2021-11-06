import "../css/mosPok.css";
import { Link } from "react-router-dom"
const colors = {
	fire: '#FF8C00',
	grass: '#008000',
	electric: '#FFFF00',
	water: '#00FFFF',
	ground: '#800000',
	rock: '#808080',
	fairy: '#FF00FF',
	poison: '#800080',
	bug: '#00FF00',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#000000'
};
const colors2 = {
	ground: "#e7d39f",
	electric: "#fdd998",
	bug: "#cee397",
	dark: "#222831",
	dragon: "#8ac6d1",
	fairy: "#ffb6b9",
	fighting: "#ffc38b",
	fire: "#ff6363",
	flying: "#a4c5c6",
	ghost: "#827397",
	grass: "#b7efcd",
	ice: "#dae1e7",
	normal: "#eae7d9",
	poison: "#8566aa",
	psychic: "#efa8e4",
	rock: "#d2c6b2",
	steel: "#5f6769",
	water: "#9aceff"
};



export default  function Pokemons({name, vida, fuerza, velocidad, altura, peso, img,id,type,type2}){

    var estilo={
        textDecoration: 'none',
        borderColor:colortipe(type), 
        color: colortipe(type) 
    }
    
	var estilo2={
        textDecoration: 'none',
        borderColor:colortipe(type2), 
        color: colortipe(type2) 
    }
    return <div className="mosCard"  style={{backgroundColor:colortipe(type,true)}}>
        <Link style={{textDecoration: 'none',color:"black"}} to={`/${id}`}>
        <h1>{name}</h1>
        <img  className="mosImg" src={ img} alt={img}/>  
        <h2>#{id
			.toString()
			.padStart(3, '0')}</h2>      
        </Link>         
        <h3 style={estilo}>{type}</h3>
		<h3 style={estilo2}>{type2}</h3>
    </div>
}

export  function colortipe(x,a){
    if(a){
        return colors2[x] 
    }else return colors[x]
}