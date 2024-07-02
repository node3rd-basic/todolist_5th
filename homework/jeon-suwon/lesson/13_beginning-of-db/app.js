import mysql from "mysql2/promise"; // 기본 기능을 사용하려면 mysql2을 가져온다.
import { ENV_KEY } from "./constants/env.constants.js";

const connection = await mysql.createConnection({
  host: ENV_KEY.HOST,
  user: ENV_KEY.USER,
  password: ENV_KEY.PASSWORD,
  database: ENV_KEY.DATABASE,
});
const [show] = await connection.execute("show tables");
console.log(show);

const [insert] = await connection.execute(
  "INSERT INTO users (email, password, name, role) VALUES ('sw0330@example.com','1234','홍길동','tutor')"
);
console.log(insert);

const [select] = await connection.execute(
  "select * from users where email = 'swjeon0330@example.com'"
);
console.log(select);

const [update] = await connection.execute(
  "UPDATE users SET name='김길동' WHERE name='홍길동'"
);
console.log(update);

const [DELETE] = await connection.execute(
  "delete from users where name='김길동'"
);
console.log(DELETE);

const [selectuser] = await connection.execute("select * from users");
console.log(selectuser);

// const [drop] = await connection.execute("DROP TABLE users");
// console.log(drop);
