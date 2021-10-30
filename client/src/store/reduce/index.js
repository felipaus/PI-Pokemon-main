import { FETCH_POKEMON, SEARCH_POKEMON, SORT } from "../actions";

const initialState = {
  pokemon: [],
  filterPokemon: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POKEMON:
      return {
        ...state,
        pokemon: action.payload,
        filterPokemon: action.payload,
      };
    case SEARCH_POKEMON:
      return {
        ...state,
        pokemon: action.payload,
      };
    case SORT:
      let orderPokemon = [...state.pokemon];
      orderPokemon.sort((a, b) => {
        if (action.payload === "ascendente") {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        } else {
          if (a.name < b.name) {
            return 1;
          }
          if (a.name > b.name) {
            return -1;
          }
          return 0;
        }
      });
      return {
        ...state,
        pokemon: orderPokemon,
      };
    default:
      return state;
  }
}
