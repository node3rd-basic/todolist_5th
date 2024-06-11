import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;

const secretKey = 'aksjhdfjkladhfklhjaskl';

const todoItems = [
  {
    id: 1,
    userId: 1,
    title: '할일1',
    doneAt: '2021-08-01',
    createdAt: '2021-08-01',
    updatedAt: '2021-08-01',
  },
  {
    id: 2,
    userId: 1,
    title: '할일2',
    doneAt: '2021-08-01',
    createdAt: '2021-08-01',
    updatedAt: '2021-08-01',
  },
];

const users = [
  {
    id: 1,
    email: 'dldustj0209@naver.com',
    password: 'd',
    role: 'student',
    name: '이연서',
  },
];

app.use(cors());
app.use(express.json());

//사용자 인증 미들웨어
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = jwt.verify(token, secretKey);

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: '권한이 없습니다.' });
  }
};

//입력 투두 아이디 검증
const todoItemIdValidator = (req, res, next) => {
  const id = +req.params.id;
  console.log('2222', id);
  if (isNaN(id)) {
    throw new Error(400, '아이디는 숫자 형태로 입력해야 합니다.');
  }
  req.id = id;
  next();
};

app.get('/', (req, res) => {
  res.send('안녕하세요');
});

//할 일 목록 조회 api
app.get('/todo-items', authMiddleware, (req, res) => {
  const user = req.user;

  return res.send(todoItems.filter((todoItem) => todoItem.userId === user.id));
});

//할 일 상세 조회 api
app.get('/todo-items/:id', authMiddleware, todoItemIdValidator, (req, res) => {
  const todoItemId = req.id;
  const user = req.user;

  const selectedTodoItem = todoItems.find((todoItem) => todoItem.id === todoItemId);

  if (!selectedTodoItem) {
    return res.status(404).json({ message: '해당 아이디의 할 일이 존재하지 않습니다.' });
  }

  if (selectedTodoItem.userId !== user.id) {
    return res.status(401).json({ message: '접근 권한이 없는 투두 목록입니다.' });
  }

  return res.send(selectedTodoItem);
});

//할 일 등록 api
app.post('/todo-items', authMiddleware, (req, res) => {
  const { title } = req.body;
  const user = req.user;
  const newTodoId = todoItems[todoItems.length - 1] ? todoItems[todoItems.length - 1].id + 1 : 1;

  const newTodoItem = {
    id: newTodoId,
    userId: user.id,
    title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };

  todoItems.push(newTodoItem);
  return res.send(newTodoItem);
});

//할 일 수정 api
app.put('/todo-items/:id', authMiddleware, todoItemIdValidator, (req, res) => {
  const user = req.user;
  const todoItemId = req.id;

  const selectedTodoItem = todoItems.find((todoItem) => todoItem.id === todoItemId);

  if (!selectedTodoItem) {
    return res.status(404).json({ message: '해당 아이디의 할 일이 존재하지 않습니다.' });
  }

  if (selectedTodoItem.userId !== user.id) {
    return res.status(404).json({ message: '수정 권한이 없습니다.' });
  }

  const todoItemIndex = todoItems.indexOf(selectedTodoItem);

  todoItems.splice(todoItemIndex, 1, {
    ...selectedTodoItem,
    doneAt: selectedTodoItem.doneAt == null ? new Date() : null,
  });

  return res.send(todoItems.filter((todoItem) => todoItem.userId === user.id));
});

//할 일 삭제 api
app.delete('/todo-items/:id', authMiddleware, todoItemIdValidator, (req, res) => {
  const user = req.user;
  const todoItemId = req.id;
  const todoItemIndex = todoItems.findIndex((todoItem) => todoItem.id === todoItemId);

  if (todoItemIndex === -1) {
    return res.status(400).json({ message: '해당 아이디의 할 일이 존재하지 않습니다.' });
  }
  if (todoItems[todoItemIndex].userId !== user.id) {
    return res.status(401).json({ message: '삭제 권한이 없습니다.' });
  }

  todoItems.splice(todoItemIndex, 1);

  return res.send(todoItems.filter((todoItem) => todoItem.userId === user.id));
});

//회원가입 api
app.post('/sign-up', (req, res) => {
  const { email, password, rePassword, role, name } = req.body;
  if (!email || !password || !rePassword || !role || !name) {
    return res.status(400).json({ message: '필수 입력값이 누락되었습니다.' });
  }
  if (password !== rePassword) {
    return res.status(400).json({ message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' });
  }
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: '이미 가입한 이메일입니다.' });
  }
  const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;
  const newUser = { id, email, password, role, name };

  users.push(newUser);
  return res.status(200).json({ newUser });
});

//로그인 api
app.post('/sign-in', (req, res) => {
  const { email, password } = req.body;
  const { password: _pw, ...user } = users.find((user) => user.email === email && user.password === password);
  if (!user) {
    return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
  }

  const token = jwt.sign(user, secretKey);
  return res.status(200).json({ token });
});

//토큰 검증 api
app.get('/users/me', authMiddleware, (req, res) => {
  return res.json(req.user);
});

app.listen(port, () => {
  console.log(`${port}로 서버가 열렸습니다!`);
});
