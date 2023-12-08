import {config} from 'dotenv';

config();

export const PORT = process.env.PORT || 3306;
export const DB_NAME = process.env.DB_NAME || 'gksweb';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'jordy2002';
export const DB_HOST = process.env.DB_HOST || 'localhost'; 
export const SERVE = process.env.SERVE || 3000;