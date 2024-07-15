import conn from '../common/conn.js'

export const findUser = async (email) => {
  const [users] = await conn.execute(
    `SELECT * FROM users WHERE email = "${email}"`
  );
  return users[0];
};

export const pushUser = async (userData) => {
  const sql = `INSERT INTO users (email, password, role, name) VALUES (:email, :password, :role, :name)`;
  const result = await conn.execute(sql, userData);

  return {
    id: result[0].insertId,
    ...userData,
  };
};