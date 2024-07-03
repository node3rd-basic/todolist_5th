import conn from '../common/conn.js';

export const findUserByEmail = async (email) => {
  const sql = `SELECT * FROM users WHERE email = ?`;
  const [users] = await conn.execute(sql, [email]);

  return users[0];
};

export const createUser = async (userData) => {
  const sql = `INSERT INTO users (email, password, role, name) VALUES (:email, :password, :role, :name)`;
  const result = await conn.execute(sql, userData);

  return {
    id: result[0].insertId,
    ...userData,
  };
};
