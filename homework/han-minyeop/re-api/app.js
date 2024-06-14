import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { todo } from 'node:test';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//err 미들웨어
const errMiddleware = (err, req, res, next) => {
  res.status("500").json({
    msg: '서버에러입니다'
  });
};

const secretkey = 'dddddd';

// 할일 목록
const todoItems = [
  {
    "id": 1,
    "userID": 1,
    "title": "빨리하고 집가기",
    "doneAT": "2024-06-14",
    "createdAt": "2024-06-14",
    "updatedAt": "2024-06-14"
  }
];

// 내정보
const users = [
  {
  id: 1,
  email: 'minyeop0423@naver.com',
  password: '1234',
  role: 'student',
  name: '한민엽',
  }
];

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if(!token) {
    res.status(401).json({message: '권한이 없습니다'});
    return;
  }
  try {
    req.user = jwt.verify(token, secretkey);
    next();
  } catch (error) {
    res.status(401).json({message: '권한이 없습니다'});
  }
}

//GET /todo-items : 전체 조회
app.get('/todo-items', authMiddleware, (req, res) => {
  const user = req.user;
  res.send(todoItems.filter((todoItem) => todoItem.userId === user.id));
  return;
});

//GET /todo-items/:id 1개 조회
app.get('/todo-items/:todoId', authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const user = req.user;
  const selectedTodoItem = todoItems.find((todoItem) => todoItem.id === id);

  if (!selectedTodoItem) {
    res.status(404).json({message: '할일이 없습니다'});
    return;
  }
  if (selectedTodoItem.userId !== user.id) {
    res.status(401).json({message: '권한이 없습니다'});
    return;
  }
  res.send(selectedTodoItem);
  return; 
});

//POST /todo-items : 할일 추가
app.post('/todo-items', authMiddleware, (req, res) => {
  const { title } = req.body;
  const user = req.user;
  const newId = todoItems[todoItems.length-1] ? todoItems[todoItems.length-1].id + 1 : 1;
  const newTodoItem = {
    id: newId,
    userId: user.id,
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };
  todoItems.push(newTodoItem);
  res.send(newTodoItem);
  return;
});
//PUT /todo-items/:id : 할일 수정
app.put('/todo-items/:id', authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const user = req.user;
  if (isNaN(id)) {
    res.status(400).json({message: 'id가 잘못되었습니다'});
    return;
  }
  const todoItemFind = todoItems.find(todoItem => todoItem.id === id);
  if (!todoItemFind) {
    res.status(404).json({message: '할일이 없습니다'});
    return;
  }
  if (todoItemFind.userId !== user.id) {
    res.status(401).json({message: '권한이 없습니다'});
    return;
  } 
  const todoItemIndex = todoItems.indexOf(todoItemFind);
  todoItems.splice(todoItemIndex, 1, {
    ...todoItemFind, 
    doneAt: todoItemFind.doneAt == null ? new Date() : null
  });
  res.send({msg: '수정되었습니다'});
  return;
});

//DELETE /todo-items/:id : 할일 삭제
app.delete('/todo-items/:id', authMiddleware, (req, res) => {
  const {id} = req.params;
  const numberid = Number(id);
  const user = req.user;

  if (isNaN(numberid)) {
    res.status(400).json({message: 'id가 잘못되었습니다'});
    return;
  }
  
  const todoItemIndex =  todoItems.findIndex((todoItem) => todoItem.id === numberid);
  if (todoItemIndex === -1) {
    res.status(404).json({message: '할일이 없습니다'});
    return;
  }
  if (todoItems[todoItemIndex].userId !== user.id) {
    res.status(401).json({message: '권한이 없습니다'});
    return;
  }
  todoItems.splice(todoItemIndex, 1);
  res.send({msg: '삭제되었습니다'});
  return;
} );
//회원가입  //return 뺴서 작성하는 방법이 더 좋음....!!!
app.post('/sign-up', (req, res) => {
  const { email, password, rePassword, role, name } = req.body;
  if (!email || !password || !rePassword || !role || !name) {
    res.status(400).json({message: '필수값이 누락되었습니다'});
    return;
  }
  if (password !== rePassword) {
    res.status(400).json({message: '비밀번호가 일치하지 않습니다'});
    return;
  }
  const existingUsers = users.find((user) => user.email === email);
  if (existingUsers) {
    res.status(409).json({message: '이미 가입된 이메일입니다'});
    return;
  }
  const id = users.length === 0 ? 1 : users[users.length -1].id + 1;
  const newUser = {id, email, password, role, name};

  users.push(newUser);
  res.status(200).json({ newUser }); 
  return;
});

// 로그인
app.post('/sign-in', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    res.status(404).json({message: '사용자를 찾을 수 없습니다'});
    return;
  }
  const {password: _pw, ...userWithoutPassword} = user;
  const token = jwt.sign(userWithoutPassword, secretkey);
  res.status(200).json({token});
  return;
});


app.get('/users/me', authMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

app.use(errMiddleware);


app.listen(port, () => {
  console.log(`${port}번 포트로 연결되었습니다.`);
});
