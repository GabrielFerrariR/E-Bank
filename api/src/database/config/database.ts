import { Options } from 'sequelize';
require('dotenv/config');

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '123456',
  database: process.env.DATABASE || 'NGCash',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3002,
  dialect: 'postgres',
};

module.exports = config;