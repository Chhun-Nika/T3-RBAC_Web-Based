// import db from "../models/index.js";

// export const getAllRoles = async (req, res) => {
//     try {
//     const roles = await db.Role.findAll({
//       attributes: ['role_id', 'name', 'description']
//     });
//     res.json(roles);
//   } catch (error) {
//     console.error('Failed to fetch roles:', error);
//     res.status(500).json({ error: 'Failed to fetch roles' });
//   }
// }

import db from "../models/index.js";

export const getAllRoles = async (req, res) => {
  try {
    const roles = await db.Role.findAll({
      attributes: ['role_id', 'name', 'description'],
      include: [
        {
          model: db.Privilege,
          attributes: ['privilege_id', 'resource', 'action'],
          through: { attributes: [] } // hide join table
        }
      ]
    });

    res.json(roles);
  } catch (error) {
    console.error('Failed to fetch roles with privileges:', error);
    res.status(500).json({ error: 'Failed to fetch roles with privileges' });
  }
};
