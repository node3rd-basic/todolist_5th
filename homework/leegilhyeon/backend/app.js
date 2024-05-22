const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("hello world")
});

app.listen(post, () => {
    console.log(`${port}로 서버가 열렸습니다.`)
})