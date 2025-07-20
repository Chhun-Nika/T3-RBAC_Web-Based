import express from 'express';
import { getAllRoles } from '../controllers/role.controller.js';

const roleRouter = express.Router();

roleRouter.get("/", getAllRoles);

export default roleRouter;