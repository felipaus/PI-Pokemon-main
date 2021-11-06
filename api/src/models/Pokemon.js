const { DataTypes, Sequelize } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("pokemon", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, //me genera automaticamente un UUIDV4(para configurar bien el id)
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida: {
      type: DataTypes.INTEGER,
    },
    fuerza: {
      type: DataTypes.INTEGER,
    },
    velocidad: {
      type: DataTypes.INTEGER,
    },
    altura: {
      type: DataTypes.INTEGER,
    },
    peso: {
      type: DataTypes.INTEGER,
    },
    img: {
      type: DataTypes.STRING,
      unique: true, //el valor tiene que ser unico
    },
    type1:{
      type: DataTypes.STRING
    },
    type2:{
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: []
    }
  });
};
