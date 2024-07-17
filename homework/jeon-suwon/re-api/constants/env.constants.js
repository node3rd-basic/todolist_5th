import "dotenv/config";

export const ENV_KEY = {
  SECRET_KEY: process.env.SECRET_KEY,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
};
