import mysql from 'mysql2/promise'
//데이터베이스 연결

 export default await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE 
 })
