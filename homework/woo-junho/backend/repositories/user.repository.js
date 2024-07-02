import conn from "../common/conn.js";

export async function findOne(email) {
    const sql = `select * from users where email = ?`
    const [users] = await conn.execute(sql, [email])
    console.log(users)
    return users[0]
}


export async function findOneById(id) {
    const sql = `select * from users where id = :id`
    const [users] = await conn.execute(sql, {id})

    return users
}

export async function save(user) {
    const sql = `insert into users (email, password, role, name) values (:email, :password, :role, :name)`
    const result = await conn.execute(sql, user)
    return {
        id: result[0].insertId,
        ...user
    }
}