import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;


const leaveLogMiddleware = (req, res, next) => {
    console.log(`
        ${req.method} ${req.url} [${ new Date().toISOString()}] ${ req.headers.referer}`)
   next()
}

const errorMiddleware = (err, req, res, next) => {
    res.status(500).json({
        message:"Internal Server Error"
    })
}

app.use(express.json());
app.use(cors());
app.use(leaveLogMiddleware);

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
    role : "student", 
}]

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization

    try{
        req.user = jwt.verify(token, secretKey)
        next()

    }catch(err) {
        res.status(401).send({ message : "권한이 없습니다."})
    }      
}

const validateTodoItemId = (req) => {
    const idAsNumber = Number(req.params.id)
    if(isNaN(idAsNumber)){
        throw new Error("ID는 숫자여야 합니다.")
    }

    return idAsNumber
}

const getTodoItemById = (id) => {
    const todoItem = todoItems.find(todoItem => todoItem.id === id)
    if(!todoItem) {
        throw new Error("할 일 목록을 찾을 수 없습니다.")
    }
    return todoItem
}

const getIncrementedId = arr => arr[todoItems.length - 1] 
? arr[todoItems.length - 1].id + 1 
: 1

app.get('/todo-items', authMiddleware, (req, res) => {
   const user = req.user
res.send(todoItems.filter(todoItem => todoItem.userId === user.id))
});

app.post('/todo-items', authMiddleware, (req, res) => {
    
    const { title } = req.body;
    const user = req.user
    const newId = getIncrementedId(todoItems)
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

});

app.get('/todo-items/:id', authMiddleware,(req, res) => {
    const id = validateTodoItemId(req)
    const todoItem = getTodoItemById(id)
    res.send(todoItem)
})


app.put('/todo-items/:id', authMiddleware, (req, res) => {
    const id = validateTodoItemId(req)
    const selectedTodoItem = getTodoItemById(id)

    const todoItemIndex = todoItems.indexOf(selectedTodoItem)
    todoItems.splice(todoItemIndex, 1,
        {
            ...selectedTodoItem,
            doneAt: selectedTodoItem.doneAt == null ? new Date() : null
        })
      res.send({ result: true})
    })


app.delete("/todo-items/:id", authMiddleware,(req, res) => {
    const id = validateTodoItemId(req)
    const selectedTodoItem = getTodoItemById(id)
    const indexToDelete = todoItems.indexOf(selectedTodoItem)
  
    todoItems.splice(indexToDelete, 1);
    res.send({ result: true });
  });

app.post("/sign-up", (req, res) => {
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
    return;

    }
    const existingUser = users.find(user => user.email === email)

    if(existingUser) {
        res.status(409).json({
             result: false,
            message: "이미 가입된 이메일입니다."
        });
        return;
    }
    const id = getIncrementedId(users)
    const newUser = { id, email, password, rePassword, role, name } 
    users.push(newUser)
    res.json(newUser)
})

app.post( "/sign-in", (req, res) => {
    const { email, password } = req.body
    const selectedUser =  users.find(user => user.email === email && user.password === password)
    const { password: _password, ...user } = selectedUser

    if(!user) {
        res.status(404).send({
            result: false,
            message: "사용자를 찾을 수 없습니다."
        });
        return;
    }
    const token = jwt.sign(user, secretKey)
    res.json({ message: "로그인에 성공하였습니다.", token })
});

app.get("/users/me", authMiddleware, (req, res) => {
  res.json(req.user)
});

app.use(errorMiddleware)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
