const { DataTypes, Sequelize } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("type", {
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
  });
};
