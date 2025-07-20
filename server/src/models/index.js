
import { Sequelize } from 'sequelize';
import dbConfig from '../config/db.config.js';
import UserModel from './user.model.js';
import roleModel from './role.model.js';
import privilegeModel from './privilege.model.js';


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = UserModel(sequelize, Sequelize);
db.Role = roleModel(sequelize, Sequelize);
db.Privilege = privilegeModel(sequelize, Sequelize);

// Associations
db.Role.hasMany(db.User, { foreignKey: "role_id" });
db.User.belongsTo(db.Role, { foreignKey: "role_id" });

db.Role.belongsToMany(db.Privilege, {
  through: "RolePrivilege",
  foreignKey: "role_id",
  otherKey: "privilege_id",
});

db.Privilege.belongsToMany(db.Role, {
  through: "RolePrivilege",
  foreignKey: "privilege_id",
  otherKey: "role_id",
});

await sequelize.sync({ alter: true })

export default db;