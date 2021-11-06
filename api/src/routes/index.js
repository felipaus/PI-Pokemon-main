const { Router } = require("express");
const pokemonRutes = require("./pokprueba");
const typeRutes = require("./type");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/type", typeRutes);
router.use("/pokemon", pokemonRutes); // esto me genera /api/pokemon/*  (traigo las rotuterdel archivo pokemon.js)

module.exports = router;
