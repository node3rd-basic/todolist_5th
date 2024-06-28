import conn from "../common/conn.js";

export async function findOne(email) {
    const [users] = await conn.execute(`SELECT * FROM users WHERE email = '${email}'`)
    return users[0]
}

export async function save(user) {
    const sql = `INSERT INTO users (email, password, name, role) VALUES ('${user.email}', '${user.password}', '${user.name}', '${user.role}')`
    const result = await conn.execute(sql)
    return {
        id: result[0].insertId,
        ...user
    }
}