import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

let todoItems = [
    {
        id: 1,
        userId: 1,
        title: "알고리즘 코드카타풀기",
        doneAt: null,
        createdAt: new Date(),
        updatedAt: null
    },
    {
        id: 2,
        userId: 1,
        title: "밥 먹기",
        doneAt: null,
        createdAt: new Date(),
        updatedAt: null
    },
    {
        id: 3,
        userId: 1,
        title: "강의 듣기",
        doneAt: null,
        createdAt: new Date(),
        updatedAt: null
    }
];

app.get('/todo-items', (req, res) => {
    res.send(todoItems);
});

app.post('/todo-items', (req, res) => {
    const { title } = req.body;
    const newId = todoItems.length ? todoItems[todoItems.length - 1].id + 1 : 1;
    const newTodoItem = {
        id: newId,
        userId: 1,
        title: title,
        doneAt: null,
        createdAt: new Date(),
        updatedAt: null
    };
    todoItems.push(newTodoItem);
    res.send(newTodoItem);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
