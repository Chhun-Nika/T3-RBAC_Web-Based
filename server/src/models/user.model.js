import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';
// models/User.js
const UserModel = (sequelize) => {
  const User = sequelize.define("User", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    host: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  });

  // ensure that the password is hashed before inserting into database
  User.beforeCreate(async (user) => {
    if(user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
  })

  return User;
};

export default UserModel;

