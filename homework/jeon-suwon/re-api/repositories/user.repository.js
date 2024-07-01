import { user } from "../db/user.db.js";
import { conn } from "../common/db.js";

export const newId = () => {
  return user.length > 0 ? user[user.length - 1].userId + 1 : 1;
};

export const signUp = async (email, password, role, name) => {
  const data = await conn.execute(
    `INSERT INTO users (email, password, name, role) VALUES ("${email}","${password}","${name}","${role}")`
  );

  return data;
};

export const findEmailById = (email) => {
  user.find((el) => el.email === email);
};

export const findUser = async (email) => {
  const [findUser] = await conn.execute(
    `SELECT * FROM users WHERE email = "${email}"`
  );
  console.log(findUser);
  return findUser;
};
