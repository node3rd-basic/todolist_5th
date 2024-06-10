// express 사용할 수 있도록 로드
const express = require('express')
const cors = require('cors')

// 나의 통신 가능한 프로그램 (application)을 정의
const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
    let text = 'Hello World!'
  res.send(
    text
  )
})

app.get('/hello', (req, res) => {
    res.send('world~!!!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})