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

app.get('/', (req, res) => {
  res.send('안녕하세요');
});

//할 일 목록 조회 api
app.get('/todo-items', (req, res) => {
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token, secretKey);
    return res.send(todoItems.filter((todoItem) => todoItem.userId === user.id));
  } catch (error) {
    return res.status(401).json({ message: '인증정보가 유효하지 않습니다.' });
  }
});

//할 일 상세 조회 api
app.get('/todo-items/:id', (req, res) => {
  const id = Number(req.params.id);
  const todoItem = todoItems.find((todoItem) => todoItem.id === id);

  return res.send(todoItem);
});

//할 일 등록 api
app.post('/todo-items', (req, res) => {
  const { title } = req.body;
  const token = req.headers.authorization;

  try {
    const user = jwt.verify(token, secretKey);
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
  } catch (error) {
    return res.status(401).json({ message: '인증정보가 유효하지 않습니다.' });
  }
});

//할 일 수정 api
app.put('/todo-items/:id', (req, res) => {
  const { id } = req.params;
  const todoItemId = Number(id);

  if (isNaN(todoItemId)) {
    return res.status(400).json({ message: '할 일 아이디는 숫자 형태로 입력해야 합니다.' });
  }

  const selectedTodoItem = todoItems.find((todoItem) => todoItem.id === todoItemId);

  if (!selectedTodoItem) {
    return res.status(404).json({ message: '해당 아이디의 할 일이 존재하지 않습니다.' });
  }

  const todoItemIndex = todoItems.indexOf(selectedTodoItem);

  todoItems.splice(todoItemIndex, 1, {
    ...selectedTodoItem,
    doneAt: selectedTodoItem.doneAt == null ? new Date() : null,
  });

  return res.send(todoItems);
});

//할 일 삭제 api
app.delete('/todo-items/:id', (req, res) => {
  const { id } = req.params;
  const todoItemId = Number(id);

  if (isNaN(todoItemId)) {
    return res.status(400).json({ message: '할 일 아이디는 숫자 형태로 입력해야 합니다.' });
  }

  const todoItemIndex = todoItems.findIndex((todoItem) => todoItem.id === todoItemId);

  if (todoItemIndex === -1) {
    return res.status(400).json({ message: '해당 아이디의 할 일이 존재하지 않습니다.' });
  }

  todoItems.splice(todoItemIndex, 1);

  return res.send(todoItems);
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
  console.log(user);
  const token = jwt.sign(user, secretKey);
  return res.status(200).json({ token });
});

//토큰 검증 api
app.get('/users/me', (req, res) => {
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token, secretKey);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ message: '인증정보가 유효하지 않습니다.' });
  }
});

app.listen(port, () => {
  console.log(`${port}로 서버가 열렸습니다!`);
});
