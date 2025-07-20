import db from "../models/index.js";

export const getSummary = async (req, res) => {
  try {
    const userCount = await db.User.count();
    const roleCount = await db.Role.count();
    const privilegeCount = await db.Privilege.count();

    res.json({
      users: userCount,
      roles: roleCount,
      privileges: privilegeCount,
    });
  } catch (error) {
    console.error("Failed to fetch counts:", error);
    res.status(500).json({ error: "Failed to fetch counts" });
  }
};