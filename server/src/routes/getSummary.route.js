import express from 'express';
import { getSummary } from '../controllers/getSummary.controller.js';

const summaryRouter = express.Router();

summaryRouter.get("/", getSummary);

export default summaryRouter;