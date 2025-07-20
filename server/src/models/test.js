import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

console.log('Loaded ENV → DB_USERNAME:', process.env.DB_USERNAME);