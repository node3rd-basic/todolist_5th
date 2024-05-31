const express = require("express");
const app = express()
const port = 3000

app.get("/todo_items", (req, res) => {
  res.send([
    {id:1, content: "개인과제하기"},
    {id:2, content: "밥먹기"},
    {id:3, content: "TIL 작성"},
    {id:4, content: "알고리즘 코드카타"},
    {id:5, content: "운동하기"},
    {id:6, content: "팀프로젝트"},
  ]);
});

app.get('/todo_items/:id', (req, res)=>{
  const id = Number(req.params.id)
  const todoItems = [
    {id:1, content: "개인과제하기"},
    {id:2, content: "밥먹기"},
    {id:3, content: "TIL 작성"},
    {id:4, content: "알고리즘 코드카타"},
    {id:5, content: "운동하기"},
    {id:6, content: "팀프로젝트"},
  ];
})

const todoItem =todoItems.find(todoItem => todoItem.id == id)
res.send(todoItem)

app.listen(port, () => {
  console.log(`${port}로 서버가 열렸습니다!`);
});