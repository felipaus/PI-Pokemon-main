import {
  FETCH_POKEMON,
  SEARCH_POKEMON,
  SORT,
  FILTER_TYPE,
  FILTRO,
  PAGINADO,
  CREADOR,
  FUERZA,
} from "../actions";

const initialState = {
  pokemon: [],
  filterPokemon: [],
  creado: [],
  filterType: [],
  cont: 9,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POKEMON:
      let prime = action.payload;
      let x = prime.slice(0, state.cont);
      return {
        ...state,
        pokemon: x,
        filterPokemon: action.payload,
        creado: action.payload,
      };
    case SEARCH_POKEMON:
      return {
        ...state,
        pokemon: action.payload,
      };
    case FILTER_TYPE:
      return {
        ...state,
        filterType: action.payload,
      };
    case SORT:
      let orderPokemon = [...state.filterPokemon];
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
      // console.log(state.cont)
      let h = orderPokemon.slice(0, 9);
      state.cont=9
      return {
        ...state,
        pokemon: h,
        filterPokemon: orderPokemon,
      };
    case FILTRO:
      let filtararTypo = [...state.filterPokemon];
      let a = filtararTypo.filter((pok) => pok.type1 === action.payload);
      return {
        ...state,
        pokemon: a,
      };
    case PAGINADO:
      let paginado = [...state.filterPokemon];
      let b;
      if (action.payload === "Siguiente") {
        if (paginado.length <= state.cont) {
          state.cont = paginado.length + 8;
        } else {
          state.cont = state.cont + 12;
        }
      } else {
        if (state.cont > 21) {
          state.cont = state.cont - 12;
        } else {
          state.cont = 12;
        }
      }
      // console.log(state.cont)
      b = paginado.slice(state.cont - 12, state.cont);

      return {
        ...state,
        pokemon: b,
      };
    case CREADOR:
      let exis = [...state.creado];
      let aux;
      if (action.payload === "Create") {
        aux = exis.filter(function (a) {
          if (typeof a.id === "string") {
            return a;
          }
        });
      } else if (action.payload === "Origin") {
        aux = exis.filter(function (a) {
          if (typeof a.id === "number") {
            return a;
          }
        });
      }else aux=exis

      return {
        ...state,
        pokemon: aux,
      };
    case FUERZA:
      let Mayor = [...state.filterPokemon];
      if (action.payload === "Mayor") {
        Mayor.sort(function (a, b) {
          return b.fuerza - a.fuerza;
        });
      } else {
        Mayor.sort(function (a, b) {
          return a.fuerza - b.fuerza;
        });
      }
      return {
        ...state,
        pokemon: Mayor,
      };
    default:
      return state;
  }
}
