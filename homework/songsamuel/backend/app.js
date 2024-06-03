const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('연습만이 살 길이다.1')
})

// app.get('/', (req,res) => {
//   res.send('연습만이 살길이다.2')
// })

// app.get('/', (req, res) => {
//     res.send('연습만이 살길이다.3')
// })

// app.get('/', (req, res) => {
//     res.send('연습만이 살길이다.4')
// })

// app.get('/', (req, res) => {
//     res.send('연습만이 살길이다.5')
// })


app.get('/todolists', (req, res, next)=>{
  const todolists = [
    { id: 1, task: "숨쉬기" },
    { id: 2, task: "먹기" },
    { id: 3, task: "자기" },
    { id: 4, task: "공부하기" },
    { id: 5, task: "영화보기" },
    { id: 6, task: "게임하기" },
  ];

  return res.send(todolists);
});


app.get('/todolists/:todolistId', (req, res, next)=>{
  const todolistId = Number(req.params.todolistId)    // 여기서 숫자형으로 바꾸는 이유는 아래의 todo.id와 타입과 정보가 일치해야하기 때문에 숫자형으로 바꾸는 것이다.
                                                      // 또한 .todolistId를 작성하는 이유는 URL에 :todolistId에서 받아오는 값이랑 일치해야하기 때문이다. 
  const todolists = [
    { id: 1, task: "숨쉬기" },
    { id: 2, task: "먹기" },
    { id: 3, task: "자기" },
    { id: 4, task: "공부하기" },
    { id: 5, task: "영화보기" },
    { id: 6, task: "게임하기" },
  ];

  const findtodo = todolists.find(todo => {
    return todo.id === todolistId
  });

  return res.send(findtodo);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

