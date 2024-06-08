const jwt = require('jsonwebtoken')

const secretKey = "basic-class-key"

// token 발급
const token = jwt.sign({
    name: "우준호",
    email: "noggong@example.com",
    role: "tutor",
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 한시간 유효기간
}, secretKey)

console.log(token)

// token 검증
const user = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi7Jqw7KSA7Zi4IiwiZW1haWwiOiJub2dnb25nQGV4YW1wbGUuY29tIiwicm9sZSI6InR1dG9yIiwiZXhwIjoxNzE3NzU5MDQwLCJpYXQiOjE3MTc3NTkwMjB9.NBt_OeJBjEmEd3ci15quSWVVnMymssySC2YfQH7bXvw", secretKey)
console.log(user)

