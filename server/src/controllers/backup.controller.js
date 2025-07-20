import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

// For __dirname support in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_NAME = process.env.DB_NAME;
const USER = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// Backup Controller
export const backupDatabase = (req, res) => {
  const filePath = path.join(__dirname, "../../backup", `${DB_NAME}_backup.sql`);
  const command = `mysqldump -u ${USER} -p${PASSWORD} ${DB_NAME} > "${filePath}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) return res.status(500).json({ error: error.message });
    if (stderr) console.warn(stderr);
    return res.json({ message: "Backup completed", file: filePath });
  });
};

// Restore Controller
export const restoreDatabase = (req, res) => {
  const { targetDatabase } = req.body;

  if (!targetDatabase) {
    return res.status(400).json({ error: "Target database name is required" });
  }

  const filePath = path.join(__dirname, "../../backup", `${DB_NAME}_backup.sql`);
  const command = `mysql -u ${USER} -p${PASSWORD} ${targetDatabase} < "${filePath}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) return res.status(500).json({ error: error.message });
    if (stderr) console.warn(stderr);
    return res.json({ message: `Restored into database: ${targetDatabase}` });
  });
};