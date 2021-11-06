// import axios from "axios";
import axios from "axios";

export const FETCH_POKEMON = "FETCH_POKEMON";
export const SEARCH_POKEMON = "SEARCH_POKEMON";
export const SORT="SORT"
export const FILTER_TYPE="FILTER_TYPE"
export const FILTRO="FILTRO"
export const PAGINADO="PAGINADO"
export const CREADOR="CREADOR"
export const FUERZA="FUERZA"

export function fetchPokemon() {
  return function (dispatch) {
    axios.get("http://localhost:3001/api/pokemon")
      .then((poke) => {
        dispatch({
          type: FETCH_POKEMON,
          payload: poke.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function searchPokemon(search) {
  return function (dispatch) {
    axios.get("http://localhost:3001/api/pokemon?name="+search)
      .then((poke) => {
        dispatch({
          type: SEARCH_POKEMON,
          payload: poke.data,
        });
      })
      .catch((error) => {
        alert("Este pokemon no existe")
        console.log(error)
      });
  };
}

export function sort(order){
  return{
    type:SORT,
    payload:order
  }
}

export function filterTypo(){
  return function (dispatch) {
    axios.get("http://localhost:3001/api/type")
      .then((type) => {
        dispatch({
          type: FILTER_TYPE,
          payload: type.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function filtrar(typo){
  return{
    type:FILTRO,
    payload:typo
  }
}

export function paginado(pag){
  return{
    type:PAGINADO,
    payload:pag
  }
}

export function creador(pok){
  return{
    type:CREADOR,
    payload:pok
  }
}

export function fuerza(pok){
  return{
    type:FUERZA,
    payload:pok
  }
}