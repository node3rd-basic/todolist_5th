const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('연습만이 살 길이다.1')
})

app.get('/', (req,res) => {
  res.send('연습만이 살길이다.2')
})

app.get('/', (req, res) => {
    res.send('연습만이 살길이다.3')
})

app.get('/', (req, res) => {
    res.send('연습만이 살길이다.4')
})

app.get('/', (req, res) => {
    res.send('연습만이 살길이다.5')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})