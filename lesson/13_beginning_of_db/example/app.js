import mysql from 'mysql2/promise'
import "dotenv/config"

const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    })
const [rows] = await connection.execute("select * from users where email = 'noggong@example.com'")
console.log(rows)