import jwt  from "jsonwebtoken"
// const jwt = require('jsonwebtoken')

const secretkey = "ddddrddd"
//token 발급
const token = jwt.sign({
        email:"naji30@naver.com",
        name:"나지윤" ,
        role:"학생",
    exp:Math.floor(Date.now()/1000)+(60*60),
}, secretkey)
console.log(token)
//token 검증
const user = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hamkzMEBuYXZlci5jb20iLCJuYW1lIjoi64KY7KeA7JykIiwicm9sZSI6Iu2VmeyDnSIsImV4cCI6MTcxNzkwMjk1OCwiaWF0IjoxNzE3ODk5MzU4fQ.NAHEx11mFBpUFQ4_rWSnhYL0IGT9d-iBu-CdsZA7kDE", secretkey)
console.log(user)