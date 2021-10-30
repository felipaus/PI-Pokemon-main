const { Router } = require("express");
const { Op } = require("sequelize");
const axios = require("axios"); //es una librearia que funciona como fech
const { Pokemon } = require("../db");

const router = Router();

router.get("/", (req, res, next) => {
  let id = 0;
  id = req.query.id;
  let pokemonPromisApi;
  let pokemonPromisDb;
  console.log(id);
  if (id) {
    console.log("hola");
    pokemonPromisApi = axios.get("https://pokeapi.co/api/v2/pokemon/" + id);
    pokemonPromisDb = Pokemon.findAll({
      //esto es otra promes
      raw: true,
      // where: {
      //   id: { [Op.iLike]: "%" + id + "%" }, //esto lo que hace es bucar todo los elementos en la base dato que tenga ese nombre(todos los parecidos)
      // },
    });
    res.send(pokemonPromisApi);
  } else {
    pokemonPromisApi = axios.get("https://pokeapi.co/api/v2/pokemon"); //esto es una promesa que le pido que con axios me traiga toda la api de pokemon
    pokemonPromisDb = Pokemon.findAll({
      //esto es otra promes
      raw: true,
    });
  }
  Promise.all([pokemonPromisApi, pokemonPromisDb]).then((respuesta) => {
    //uso el Promis.all para que se las 2 promesas se ejecuten al mimso timepo
    const [
      pokemonApi, //respuesta de mi API
      pokemonDb, //respuesta de mi base de dato
    ] = respuesta;
    let filterPokemonApi = pokemonApi.data.results.map((pok) => {
      return {
        //saco los valores que no quiero enviar
        name: pok.name,
        url: pok.url,
      };
    });
    let allPokemon = [...filterPokemonApi, ...pokemonDb];
    res.send(allPokemon);
  });
});

router.post("/", async (req, res, next) => {
  try {
    const { name, url } = req.body;
    const newPokemon = await Pokemon.create({
      name,
      url,
    });
    res.send(newPokemon);
  } catch (error) {
    next(error);
  }
});

router.post("/:pokemonId/:tipoId", async (req, res, next) => {
  //esto es para cuadno agrege la tabla TIPO
  try {
    const { pokemonId, tipoId } = req.params;
    const pokemon = await Pokemon.findByPk(pokemonId);
    await pokemon.addTipo(tipoId); //son funciones son los mixin de sequelize(esto lo vimos en la calse de sequelize),, se crean automaticamente pone el add'nombreDeTuTabla'
    res.send(200);
  } catch (error) {
    next(error);
  }
});

// router.get("/", (req, res, next) => {
//   return Pokemon.findAll()
//     .then((pokemon) => {
//       res.send(pokemon);
//     })
//     .catch(() => {
//       next(error);
//     });
// });

router.put("/", (req, res, next) => {
  res.send("soy un put");
});
module.exports = router;

router.delete("/", (req, res, next) => {
  res.send("soy un put");
});
module.exports = router;
