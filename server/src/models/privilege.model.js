// models/Privilege.js
export default (sequelize, DataTypes) => 
  sequelize.define("Privilege", {
    privilege_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    resource: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    action: {
      type: DataTypes.ENUM("CREATE", "READ", "UPDATE", "DELETE", "ALL PRIVILEGES"),
      allowNull: false
    }
  });