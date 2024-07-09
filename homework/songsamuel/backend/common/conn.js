import mysql from "mysql2/promise";
import "dotenv/config";

// async 없어도 되더라..
export default await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  namedPlaceholders: true,
});
