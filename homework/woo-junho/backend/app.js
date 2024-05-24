// express 사용할수 있도록 로드
const express = require('express')
const cors = require('cors')

// 나의 통신가능한 프로그램 (application) 을 정의
const app = express()
const port = 3000
console.log(cors())
app.use(cors())


const rootApiController = (req, res) => {
    res.send("hello world")
}

app.get('/', rootApiController)


const listeningCallback = () => {
    console.log(`Example app listening on port ${port}`)
}
app.listen(port, listeningCallback)