import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("Hello World!");
});

/** 할일 목록 조회 API */
app.get('/todolist', (req, res) => {
const todos = [
    { id: 1, do: "study-node", where: "home", date: "Everyday" },
    { id: 2, do: "homework", where: "home", date: "Thursday" },
    { id: 3, do: "project", where: "home", date: "Wednesday"} ,
    { id: 4, do: "project-growth", where: "home", date: "Thursday" },
    { id: 5, do: "algorithm", where: "home", date: "Everyday" },
    { id: 6, do: "car-wash", where: "car-wash", date: "Sunday" },
    { id: 7, do: "running", where: "park", date: "Monday" },
    { id: 8, do: "health", where: "gym", date: "Wednesday" },
    { id: 9, do: "shopping", where: "mart", date: "Saturday" },
    { id: 10, do: "cleaning", where: "home", date: "Tuesday" }

];
    res.status(200).json({ message: '할일 목록이 조회되었습니다.', data: todos});
} );

/** 할일 상세 조회 API */
app.get('/todolist/:id', (req, res) => {
    const todos = [
        { id: 1, do: "study-node", where: "home", date: "Everyday" },
        { id: 2, do: "homework", where: "home", date: "Thursday" },
        { id: 3, do: "project", where: "home", date: "Wednesday"} ,
        { id: 4, do: "project-growth", where: "home", date: "Thursday" },
        { id: 5, do: "algorithm", where: "home", date: "Everyday" },
        { id: 6, do: "car-wash", where: "car-wash", date: "Sunday" },
        { id: 7, do: "running", where: "park", date: "Monday" },
        { id: 8, do: "health", where: "gym", date: "Wednesday" },
        { id: 9, do: "shopping", where: "mart", date: "Saturday" },
        { id: 10, do: "cleaning", where: "home", date: "Tuesday" }
    ];
    const todoId = Number(req.params.id);
    const todo = todos.find(todos => todos.id === todoId);

    res.status(200).json({ message: '할일이 조회되었습니다.', data: todo});
});-



app.listen(port, () => {
    console.log(port, '포트로 연결되었습니다.');
});