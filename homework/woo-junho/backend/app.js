// express 사용할수 있도록 로드
const express = require("express");
const cors = require("cors");

// 나의 통신가능한 프로그램 (application) 을 정의
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

const todoItems = [];

app.get("/todo-items", (req, res) => {
  res.send(todoItems);
});

app.post("/todo-items", (req, res) => {
  const { title } = req.body;

  const newId = todoItems[todoItems.length - 1]
    ? todoItems[todoItems.length - 1].id + 1
    : 1;
  const newTodoItem = {
    id: newId,
    userId: 1,
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };
  todoItems.push(newTodoItem);
  res.send(newTodoItem);
});

app.get("/todo-items/:id", (req, res) => {
  const id = Number(req.params.id);
  const todoItems = [
    { id: 1, name: "일기 쓰기" },
    { id: 2, name: "과제 하기" },
    { id: 3, name: "잠자기" },
    { id: 4, name: "게임하기" },
    { id: 5, name: "운동하기" },
  ];

  const todoItem = todoItems.find((todoItem) => todoItem.id === id);
  res.send(todoItem);
});

const listeningCallback = () => {
  console.log(`Example app listening on port ${port}`);
};
app.listen(port, listeningCallback);
