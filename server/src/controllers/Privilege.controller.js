import db from "../models/index.js";

export const getAllPrivileges = async (req, res) => {
  try {
    const privileges = await db.Privilege.findAll({
      attributes: ['privilege_id', 'resource', 'action']
    });
    res.json(privileges);
  } catch (error) {
    console.error('Failed to fetch privileges:', error);
    res.status(500).json({ error: 'Failed to fetch privileges' });
  }
};