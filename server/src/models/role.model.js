
// models/Role.js
export default (sequelize, DataTypes) =>
  sequelize.define("Role", {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    description: DataTypes.TEXT
  });

