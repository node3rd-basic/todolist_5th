// import usersDB from '../db/users.js';
import conn from '../common/conn.js';

export const findUser = (email, password) => {
  const user = usersDB.find((user) => user.email === email && user.password === password);

  return user;
};

export const findUserByEmail = async (email) => {
  const [users] = await conn.execute(`SELECT * FROM users WHERE email = '${email}'`);

  return users[0];
};

export const createUser = async (userData) => {
  const sql = `INSERT INTO users (email, password, name, role) VALUES ('${userData.email}', '${userData.password}', '${userData.name}', '${userData.role}')`;
  const result = await conn.execute(sql);
  return {
    id: result[0].insertId,
    ...userData,
  };
};
