const { Router } = require("express");
const { Op } = require("sequelize");
const axios = require("axios"); //es una librearia que funciona como fech
const { Pokemon, Type } = require("../db");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    let name = req.query.name;
    let arr = [];
    let allPokemon;
    let pokemonPromisDb;
    if (name) {
      pokemonPromisDb = await Pokemon.findAll({
        include: Type,
        where: {
          name: { [Op.iLike]: "%" + name + "%" }, //le dice que busque cualquier elemento que tena el name en alguna parte
        },
      });

      let pok = await axios.get("https://pokeapi.co/api/v2/pokemon/" + name);
      let obj = {
        id: pok.data.id,
        name: pok.data.name,
        vida: pok.data.stats[0].base_stat,
        fuerza: pok.data.stats[1].base_stat,
        velocidad: pok.data.stats[3].base_stat,
        altura: pok.data.height,
        peso: pok.data.weight,
        img: pok.data.sprites.front_default,
      };
      arr.push(obj);
    } else {
      let url = "https://pokeapi.co/api/v2/pokemon";
      for (let i = 0; i < 2; i++) {
        let resApi = await axios.get(url);
        let length = resApi.data.results.length;
        for (let i = 0; i < length; i++) {
          let pok = await axios.get(resApi.data.results[i].url);
          let obj = {
            id: pok.data.id,
            name: pok.data.name,
            vida: pok.data.stats[0].base_stat,
            fuerza: pok.data.stats[1].base_stat,
            velocidad: pok.data.stats[3].base_stat,
            altura: pok.data.height,
            peso: pok.data.weight,
            img: pok.data.sprites.front_default,
          };
          arr.push(obj);
        }
        url = resApi.data.next;
      }
      pokemonPromisDb = await Pokemon.findAll({
        include: Type,
      });
    }

    //aca puedo ordenarlos
    //conecto

    allPokemon = [...arr, ...pokemonPromisDb];
    res.status(200).send(allPokemon);
  } catch (error) {
    return res.status(400).json({ menssage: "No se econtro el pokemon" });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    let pok;
    if (typeof id === "string" && id.length > 8) {
      //es mio
      pok = await Pokemon.findByPk(id);
    } else {
      //es de la api
      let resApi = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id);
      pok = resApi.data;
    }
    res.status(200).send(pok);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, vida, fuerza, velocidad, altura, peso, img } = req.body;
    const newPokemon = await Pokemon.create({
      name,
      vida,
      fuerza,
      velocidad,
      altura,
      peso,
      img,
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
    await pokemon.addType(tipoId); //son funciones son los mixin de sequelize(esto lo vimos en la calse de sequelize),, se crean automaticamente pone el add'nombreDeTuTabla'
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
