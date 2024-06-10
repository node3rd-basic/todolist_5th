import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const todoItems = [
    {
        id: 1,
        userId: 1,
        title: "알고리즘 코드카타 풀기",
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

app.get('/todo-items/:id', (req, res) => {
    const id = Number(req.params.id)
   
    const todoItem = todoItems.find( (todoItem) => todoItem.id === id)
    res.send(todoItem)
})


app.put("todo-items/:id", (req, res) => {
    const id = Number(req.params.id);
    
    if (isNaN(id)){
        res.status(400).send({
            result: false,
            message: "id는 숫자여야 합니다."
        })
        return
    }
    
    const selectedTodoItem = todoItems.find(todoItem => todoItem.id === id)
    if (!selectedTodoItem){
        res.status(404).send({
            result: false,
            message: "해당 아이디를 가진 할 일 목록이 없습니다."
        })
        return
    }


    const todoItemIndex = todoItems.indexOf(selectedTodoItem)
    todoItems.splice(todoItemIndex, 1,
        {
            ...selectedTodoItem,
            doneAt: selectedTodoItem.doneAt == null ? new Date() : null
        })
      res.send({ result: true})
    })


app.delete("todo_items/:id", (req, res) =>{
    const { id } = req.params
    const idAsNumber = Number(id)

    if (isNaN(idAsNumber)){
        res.status(400).send({
            result: false,
            message: "id는 숫자여야 합니다."
        })
        return
    }
    const indexToDelete = todoItems.findIndex(todoItem => todoItem.id === id)
    
    if (indexToDelete === -1){
        res.status(404).send({
            result: false,
            message: "해당 아이디를 가진 할 일 목록이 없습니다."
        })
        return
    }

    todoItems.splice(indexToDelete, 1)

    res.send({result: true})
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

