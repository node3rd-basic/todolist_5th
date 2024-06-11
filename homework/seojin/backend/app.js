import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

const secretKey = "asdfasqweratqwe"
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



const users = [{

    id : 1,
    email : "parkseojin@example.com",
    password: "1234",
    name:"박서진",
    role : "학생", 
}]

app.get('/todo-items', (req, res) => {
    const token = req.headers.authorization

    try{
        const user = jwt.verify(token, secretKey)
        res.send(
            todoItems.filter(todoItem => todoItem.userId === user.id))
    }catch(err) {
        res.status(401).send({ message : "권한이 없습니다."})
    }
    
    
});

app.post('/todo-items', (req, res) => {
    const token = req.headers.authorization
    const { title } = req.body;


    try{
    const user = jwt.verify(token, secretKey)   
    const newId = (todoItems[todoItems.length - 1]) ? todoItems[todoItems.length - 1].id + 1 : 1
    const newTodoItem = {
        id: newId,
        userId: user.id,
        title: title,
        doneAt: null,
        createdAt: new Date(),
        updatedAt: null
    };
    todoItems.push(newTodoItem);
    res.send(newTodoItem);
} catch (e){
    res.status(401).send({ message : "권한이 없습니다."})
}
});

app.get('/todo-items/:id', (req, res) => {
    const id = Number(req.params.id) 
    const todoItem = todoItems.find( todoItem => todoItem.id === id)
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

app.post("/sign-up,", (req, res) => {
    const  { email, password, rePassword, role, name } = req.body
    if(!email ||
       !password ||
       !rePassword ||
       !role ||
       !name ||
       password !== rePassword
    ) {
        res.status(400).send({
            result: false,
            message: "입력 값을 확인해주세요."
    })
    return

    }
    const existingUser = users.find(user => user.email === email)

    if(existingUser) {
        res.status(409).json({
             result: false,
            message: "이미 가입된 이메일입니다."
        })
    }
    const id = (users.length === 0) ? 1 : users[users.length -1].id + 1
    const newUser = { id, email, password, rePassword, role, name } 
    users.push(newUser)
    res.json(newUser)
})

app.post( "/sign-in", (req, res) => {
    const { email, password } = req.body
    const { password: _password, ...user } = users.find(user => user.email === email && user.password === password)

    if(!user) {
        res.status(404).send({
            result: false,
            message: "사용자를 찾을 수 없습니다."
        })
        return
    }

    const token = jwt.sign(user, secretKey)
    res.json({ token })
})

app.get("/users/me", (req, res) => {
   const token =  req.headers.authorization

try{

   const user = jwt.verify(token, secretKey)
   res.json(user)

}catch (err) {
    res.status(401).send({ message: "권한이 없습니다."})
}
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

