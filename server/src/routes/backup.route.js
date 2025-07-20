import express from 'express';
import { backupDatabase, restoreDatabase } from '../controllers/backup.controller.js';

const backupRouter = express.Router();
backupRouter.post("/", backupDatabase);
backupRouter.post("/restore", restoreDatabase);


export default backupRouter;