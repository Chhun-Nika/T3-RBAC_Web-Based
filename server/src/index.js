import express, { json } from "express";
import db from './models/index.js';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import cors from 'cors';
import userRouter from "./routes/user.route.js";
import roleRouter from "./routes/role.route.js";
import privilegeRouter from "./routes/privilege.route.js";
import summaryRouter from "./routes/getSummary.route.js";
import backupRouter from "./routes/backup.route.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

// Enable json serialization
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', userRouter);
app.use('/roles', roleRouter);
app.use('/privileges', privilegeRouter);
app.use('/summary', summaryRouter);
app.use('/backup', backupRouter);




app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));