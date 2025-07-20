import express from 'express';
import { getAllPrivileges } from '../controllers/Privilege.controller.js';


const privilegeRouter = express.Router();

privilegeRouter.get("/", getAllPrivileges);

export default privilegeRouter;