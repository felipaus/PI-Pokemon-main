// import axios from "axios";
import axios from "axios";

export const FETCH_POKEMON = "FETCH_POKEMON";
export const SEARCH_POKEMON = "SEARCH_POKEMON";
export const SORT="SORT"

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
        console.log(error);
      });
  };
}

export function sort(order){
  return{
    type:SORT,
    payload:order
  }
}