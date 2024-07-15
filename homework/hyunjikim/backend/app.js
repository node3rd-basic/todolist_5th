// express 사용할 수 있도록 로드
const express = require('express')
// cors 허용 설정
const cors = require('cors')

// 나의 통신 가능한 프로그램 (application)을 정의
const app = express() // app이 내 통신을 주관할 수 있는 변수
const port = 3000 // 통신에 필요한 내 프로그램의 주소 지정

app.use(cors())

app.get('/', (req, res) => {
   res.send('Hello World!')
})
// app.get(메뉴판 '/메뉴 이름', (함수 / 무조건 req, res / 요청 받고 응답 내줌) => {
// res.send()
// })
app.get('/hello', (req, res) => {
   res.send("world!!!")
})
// 요청과 응답을 받는 내 프로그램은 종료되지 말고 리슨하고 있어라
// 이 부분이 없으면 그냥 종료되므로 반드시 써주기
app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})