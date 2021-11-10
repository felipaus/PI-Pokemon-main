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
        img: pok.data.sprites.other.dream_world.front_default,
        type1: pok.data.types[0].type.name,
        type2: pok.data.types
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
            img: pok.data.sprites.other.dream_world.front_default,
            type1: pok.data.types[0].type.name,
            type2: pok.data.types
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
    let pok={
      name:"No existe este Pokemon",
      img:"https://p4.wallpaperbetter.com/wallpaper/496/306/379/pokemon-dark-pikachu-sad-lonely-realistic-drawn-stylized-1280x800-anime-pokemon-hd-art-wallpaper-preview.jpg",
      id:"0",
    }
    res.status(400).send(pok);;
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    let poke;
    if (typeof id === "string" && id.length > 8) {
      //es mio
      poke = await Pokemon.findByPk(id);
    } else {
      //es de la api
      let pok = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id);
      let obj = {
        id: pok.data.id,
        name: pok.data.name,
        vida: pok.data.stats[0].base_stat,
        fuerza: pok.data.stats[1].base_stat,
        velocidad: pok.data.stats[3].base_stat,
        altura: pok.data.height,
        peso: pok.data.weight,
        img:  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/"+id+".gif",
        type1: pok.data.types[0].type.name,
        type2: pok.data.types
      };

      poke = obj;
    }
    res.status(200).send(poke);
  } catch (error) {
    next(error);

  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, img, vida, fuerza, velocidad, altura, peso, type1 } =
      req.body;
    const newPokemon = await Pokemon.create({
      name,
      img,
      vida,
      fuerza,
      velocidad,
      altura,
      peso,
      type1,
    });
    res.status(201).send(newPokemon);
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

router.get('/', (req, res) => {
  res.send(200)
});


router.put("/", (req, res, next) => {
  res.send(200)
});


router.delete("/", (req, res, next) => {
  res.send({
    message: 'delete',
  })
});
module.exports = router;
