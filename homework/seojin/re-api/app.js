 import express from 'express';
 import cors from 'cors';
 import jwt from 'jsonwebtoken';

 const app = express();
 const port = 3000
 app.use(express.json());
 app.use(cors());

 const errorMiddleware = (err, req, res, next) => {
    res.status(500).json({
        message:"Internal Server Error"
    })
 }

const secretKey = "asdfweqghnkd"
const todoItems = [
    {
        id: 1,
        userId: 1,
        title: "코드 만들기",
        doneAt: null,
        createAt: new Date(),
        updatedAt: null
    },
    {
        id: 1,
        userId: 2,
        title: "오류 체크하기",
        doneAt: null,
        createAt: new Date(),
        updatedAt: null
    }
];


const users = [{
    id: 1,
    email: 'parkseojin3@example.com',
    password: "1234",
    name: "박서진",
    role: "student",
}]

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization
    try{
        req.user = jwt.verify(token,secretKey)
        next()
    }catch(err){
        res.status(401).send({ message: "권한이 없습니다."})
    }
}



app.get('/todo-items', authMiddleware,  (req, res) => {
    const user = req.user
        res.send(
   todoItems.filter(todoItem => todoItem.userId === user.id))
 
})

app.get('/todo-items/search/:keyword',authMiddleware, (req, res) => {
    const { keyword } = req.params
    if (keyword.trim() === "") {
        res.status(400).json({ message: "검색어를 입력해주세요."})
        return
    }
    res.json(todoItems.filter(todoItem =>
        todoItem.title.includes(keyword)
        && todoItem.userId === req.user.id
    ))
})

app.post('/todo-items', authMiddleware, (req, res) => {
   
    const { title } = req.body;

   
        const user = req.user
        const newId = (todoItems[todoItems.length -1]) ? todoItems[todoItems.length -1].id + 1 : 1
        const newTodoItem = { 
            id: newId,
            userId: user.id,
            title: title,
            doneAt: null,
            createAt: new Date(),
            updatedAt: null
        };
        todoItems.push(newTodoItem);
        res.send(newTodoItem);

})

app.get('/todo-items/:id', authMiddleware, (req, res) => {
  const id = Number(req.params.id)
  const todoItem = todoItems.find( todoItem => todoItem.id === id)
  res.send(todoItem)
})

app.put('/todo-items/:id', authMiddleware, (req, res) => {
    const id = Number(req.params.id)

    if(isNaN(id)){
        res.status(400).send({ message: 'id는 숫자여야 합니다.'})
        return;
    }

    const selectedTodoItem = todoItems.find(todoItem => todoItem.id === id)
    if(!selectedTodoItem){
        res.status(404).send({
            message: "해당 할 일 목록이 존재하지 않습니다."
        })
        return
    }

    const todoItemIndex = todoItems.indexOf(selectedTodoItem)
    todoItems.splice(todoItemIndex, 1,{
        ...selectedTodoItem,
        doneAt: selectedTodoItem.doneAt == null ? new Date() : null
    })
    res.send({ result: true })
})

app.delete('/todo-items/:id', authMiddleware, (req, res) => {
    const id = Number(req.params.id)
  
    if(isNaN(id)){
     res.status(400).send({
        message:"id는 숫자여야 합니다."
     })
     return;
    }

    const indexToDelete = todoItems.findIndex((todoItem) => todoItem.id === id);

    if (indexToDelete === -1){
        res.status(404).send({
            message: "해당 id를 가진 할 일 목록이 없습니다."
        })
        return
    }

    todoItems.splice(indexToDelete, 1);

    res.send({ result: true });

})


app.post('/sign-up', (req, res) => {
    const { email, password, rePassword, role, name } = req.body

    if(!email || !password  || !rePassword || !role || !name ){
        res.status(400).send({ message: "입력 값을 확인해주세요." })
 return;
}

   if( password !== rePassword ){
    res.status(400).send({ message: "비밀번호가 일치하지 않습니다."})
    return;
   }

const existingUser = users.find(user => user.email === email)

if(existingUser) {
    res.status(409).json({
        message: "이미 가입 된 이메일입니다."
    });
    return;
}

const id = (users.length === 0) ? 1 : users[users.length - 1].id +1
const newUser = { id, email, password, rePassword, role, name }
users.push(newUser)
res.json(newUser)

})

app.post('/sign-in', (req, res) => {
    const { email, password } = req.body
    const { password: _password, ...user } = users.find(user => user.email === email && user.password === password)
   
    if(!user) {
        res.status(404).send({
            message: "사용자를 찾을 수 없습니다."
        })
        return;
    }
    const token =jwt.sign(user, secretKey)
    res.json({ message: "로그인에 성공하였습니다.", token })
});

app.get("/users/me", authMiddleware, (req, res) => {
 

        res.json(req.user)

    });

app.use(errorMiddleware)


 app.listen(port, ()=> {
    console.log(`${port}로 서버가 열렸습니다.`)
 })