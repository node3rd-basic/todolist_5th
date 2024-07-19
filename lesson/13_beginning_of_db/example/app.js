import mysql from 'mysql2/promise'
import { faker } from '@faker-js/faker/locale/en';
import "dotenv/config"
import {fa} from "@faker-js/faker";

const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    })


for (let i = 0; i < 10000000; i++) {
    const name = faker.person.fullName()
    const email = faker.internet.exampleEmail()
    const roles = ['tutor', 'student']
    const role = roles[Math.round(Math.random() * 10 % 1)]
    const password = faker.internet.password()
    console.log(i, ":", name, email, role, password)
    await connection.execute("insert into users (name, email, role, password) values (?, ?, ?, ?)", [name, email, role, password])
    if (i % 1000 === 0) {
        // delay 1 second
        await new Promise((resolve) => setTimeout(resolve, 5000))
    }
}