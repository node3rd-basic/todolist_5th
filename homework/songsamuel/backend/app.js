const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('연습많이 살 길이다.')
})

app.get('/', (req,res) => {
  res.send('연습만이 살길이다.')
})

app.get('/', (req, res) => {
    res.send('연습만이 살길이다.')
})

app.get('/', (req, res) => {
    res.send('연습만이 살길이다.')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})