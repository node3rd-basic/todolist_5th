const express = require('express')
const app = express()
const port = 3000

//0527
app.get('/', (req, res) => {
    res.send("Hello World!");
});

// 할일 목록
const todos = [
    { id: 1, task: "A" },
    { id: 2, task: "B" },
    { id: 3, task: "C" },
    { id: 4, task: "D" },
    { id: 5, task: "E" },
];
//todos = 할일 목록 배열

// 모든 할일 목록 조회
app.get("/todo-items", (req, res) => {
    res.status(200).json({ todos });
});
//req = request res = response
//request 가 들어오면 todos를 json으로 응답해준다.
//status(200) = 성공적인 응답을 의미

// 특정 할일 조회
app.get("/todo-items/:todoId", (req, res) => {
    const id = Number(req.params.todoId);
    const todoItem = todos.find((todo) => todo.id === id);
    if (todoItem) {
        res.status(200).json({ todoItem }); //할일 항목이 존재하면 200
    } else {
        res.status(404).send('할일이 없습니다'); //할일 항목이 존재하지 않으면 404
    }
});

// 서버 실행
app.listen(port, () => {
    console.log(`${3000}번 포트로 연결되었습니다.`);
} );

// http://localhost:3000/todo-items