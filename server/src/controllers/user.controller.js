import db from "../models/index.js";
import bcrypt from 'bcrypt';
import mysql from "mysql2/promise"; // use promise version for SQL statements

export const getAllUser = async (req, res) => {
    try {
        const users = await db.User.findAll({
            include: {
                model: db.Role,
                attributes: ['name', 'description']
            },
            attributes: { exclude: ['password'] } // exclude sensitive data
        });

        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users', details: err.message });
    }
}


// Create a new user both in Sequelize and in MySQL system user
export const createUser = async (req, res) => {
  const { username, password, role_id, host } = req.body;

  if (!username || !password || !role_id || !host) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {

    // 2. Create user record in your app DB
    const newUser = await db.User.create({
      username,
      password,
      role_id,
      host,
    });

    // 3. Get role name from role_id (for MySQL role name)
    const role = await db.Role.findByPk(role_id);
    if (!role) return res.status(400).json({ error: "Invalid role_id" });

    const mysqlRoleName = role.name; // Ensure this matches MySQL role name exactly

    // 4. Create MySQL user
    const createUserSQL = `CREATE USER IF NOT EXISTS '${username}'@'${host}' IDENTIFIED BY '${password}'`;
    await db.sequelize.query(createUserSQL);

    // 5. Grant MySQL role to this user
    const grantRoleSQL = `GRANT '${mysqlRoleName}' TO '${username}'@'${host}'`;
    await db.sequelize.query(grantRoleSQL);

    // 6. Flush privileges to apply changes immediately
    await db.sequelize.query(`FLUSH PRIVILEGES`);

    // 7. Respond success
    res.status(201).json({
      message: `User created and granted role '${mysqlRoleName}' successfully.`,
      user: {
        user_id: newUser.user_id,
        username: newUser.username,
        role_id: newUser.role_id,
        host: newUser.host,
      },
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Failed to create user", details: err.message });
  }
};


export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, host, role_id } = req.body;

  if (!username && !host && !role_id) {
    return res.status(400).json({ error: "No valid fields provided for update." });
  }

  try {
    // Find the existing user
    const user = await db.User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found." });

    // Get old user data for MySQL user rename
    const oldUsername = user.username;
    const oldHost = user.host;
    const oldRoleId = user.role_id;

    // Validate role_id if provided
    if (role_id) {
      const role = await db.Role.findByPk(role_id);
      if (!role) return res.status(400).json({ error: "Invalid role_id." });
    }

    // Start transaction (optional, if you want to be safe)
    const transaction = await db.sequelize.transaction();

    try {
      // Update Sequelize user
      if (username) user.username = username;
      if (host) user.host = host;
      if (role_id) user.role_id = role_id;

      await user.save({ transaction });

      // Prepare MySQL queries to update system user and privileges

      // 1. Rename MySQL user if username or host changed
      if ((username && username !== oldUsername) || (host && host !== oldHost)) {
        // MySQL RENAME USER syntax: https://dev.mysql.com/doc/refman/8.0/en/rename-user.html
        const newUsername = username || oldUsername;
        const newHost = host || oldHost;
        const renameUserSQL = `RENAME USER '${oldUsername}'@'${oldHost}' TO '${newUsername}'@'${newHost}'`;
        await db.sequelize.query(renameUserSQL, { transaction });
      }

      // 2. If role_id changed, update role grant
      if (role_id && role_id !== oldRoleId) {
        const newRole = await db.Role.findByPk(role_id);
        const mysqlRoleName = newRole.name;

        // Revoke old role
        const oldRole = await db.Role.findByPk(oldRoleId);
        if (oldRole) {
          const revokeSQL = `REVOKE '${oldRole.name}' FROM '${user.username}'@'${user.host}'`;
          await db.sequelize.query(revokeSQL, { transaction });
        }

        // Grant new role
        const grantSQL = `GRANT '${mysqlRoleName}' TO '${user.username}'@'${user.host}'`;
        await db.sequelize.query(grantSQL, { transaction });
      }

      // 3. Flush privileges
      await db.sequelize.query("FLUSH PRIVILEGES", { transaction });

      await transaction.commit();

      res.json({
        message: "User updated successfully",
        user: {
          user_id: user.user_id,
          username: user.username,
          host: user.host,
          role_id: user.role_id,
        },
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Failed to update user", details: err.message });
  }
};

// routes/users.js or controller/users.js
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.User.findByPk(id, {
      include: db.Role // Include role info if needed
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Failed to get user:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by primary key
    const user = await db.User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found." });

    const { username, host, role_id } = user;

    const transaction = await db.sequelize.transaction();
    try {
      // 1. Revoke role
      if (role_id) {
        const role = await db.Role.findByPk(role_id);
        if (role) {
          const revokeSQL = `REVOKE '${role.name}' FROM '${username}'@'${host}'`;
          await db.sequelize.query(revokeSQL, { transaction });
        }
      }

      // 2. Drop MySQL user
      const dropUserSQL = `DROP USER IF EXISTS '${username}'@'${host}'`;
      await db.sequelize.query(dropUserSQL, { transaction });

      // 3. Delete from Sequelize model
      await user.destroy({ transaction });

      // 4. Flush privileges
      await db.sequelize.query("FLUSH PRIVILEGES", { transaction });

      await transaction.commit();

      res.json({ message: "User deleted successfully." });
    } catch (error) {
      await transaction.rollback();
      console.error("Error in delete transaction:", error);
      res.status(500).json({ error: "Failed to delete user.", details: error.message });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Server error." });
  }
};