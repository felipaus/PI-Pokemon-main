const { Router } = require("express");
const axios = require("axios"); //es una librearia que funciona como fech
const { Type } = require("../db");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    typePromes = await Type.findAll({});
    let resApi = await axios.get("https://pokeapi.co/api/v2/type");
    let arr = [];
    let length = resApi.data.results.length;
    for (let i = 0; i < length; i++) {
      let typ = await axios.get(resApi.data.results[i].url);
      let obj = {
        id: i + 1,
        name: typ.data.name,
      };
      arr.push(obj);
    }
    let allType = [...arr, typePromes];
    res.send(allType);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    const newType = await Type.create({
      name,
    });
    res.send(newType);
  } catch (error) {
    next(error);
  }
});

router.post("/:pokemonId/:tipoId", async (req, res, next) => {});

router.put("/", (req, res, next) => {
  res.send("soy un put");
});

router.delete("/", (req, res, next) => {
  res.send("soy un put");
});
module.exports = router;
