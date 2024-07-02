import mysql from "mysql2/promise"; // 기본 기능을 사용하려면 mysql2을 가져온다.
import { ENV_KEY } from "../constants/env.constants.js";

export const conn = await mysql.createConnection({
  host: ENV_KEY.HOST,
  user: ENV_KEY.USER,
  password: ENV_KEY.PASSWORD,
  database: ENV_KEY.DATABASE,
});
