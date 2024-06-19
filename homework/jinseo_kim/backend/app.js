import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

//

const port = 3000;
const app = express();
const secretKey = '1a2b3c4b';

const leaveLogMiddleware = (req, res, next) => {
  console.log(`
    ${req.method} ${req.url} [${new Date().toISOString()}] ${req.headers.referer} `);
  next();
};

const errorMiddleware = (err, req, res) => {
  console.log('error 발생시 해당 middleware 실행됨');
  res.ststus(500).json({ message: 'Internal Server Error' });
  return;
};

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    req.user = jwt.verify(token, secretKey);
    next();
  } catch (error) {
    res.status(403).send({ message: '당신은 권한이 없습니다.' });
  }
};

const validateTodoItemId = (req) => {
  const idAsNumber = Number(req.params.id);
  if (isNaN(idAsNumber)) {
    throw new Error('Id must be a number');
  }
  return idAsNumber;
};

const getIncrementedId = (arr) => (arr[arr.length - 1] ? arr[arr.length - 1].id + 1 : 1);
// 삼항연산자를 다시 알아봐야 겠다...
// const getIncrementedId = (arr) => (arr.length ? 1 : arr[arr.length - 1].id + 1);
// const getIncrementedId = (arr) => (arr[arr.length - 1] ? 1 :arr[arr.length - 1].id + 1);
// const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;
app.use(leaveLogMiddleware);
app.use(cors());
app.use(express.json());

const users = [
  {
    id: 1,
    email: '1111',
    password: '1111',
    role: 'student',
    name: '1111',
  },
  {
    id: 2,
    email: '2222',
    password: '2222',
    role: 'student',
    name: '2222',
  },
];

const todoItems = [
  {
    id: 1,
    userId: 1,
    title: '할일1',
    doneAt: null,
    createdAt: '2021-08-01',
    updatedAt: '2021-08-01',
  },
  {
    id: 2,
    userId: 1,
    title: '할일1',
    doneAt: null,
    createdAt: '2021-08-01',
    updatedAt: '2021-08-01',
  },
  {
    id: 3,
    userId: 1,
    title: '할일1',
    doneAt: null,
    createdAt: '2021-08-01',
    updatedAt: '2021-08-01',
  },
  {
    id: 4,
    userId: 1,
    title: '할일1',
    doneAt: null,
    createdAt: '2021-08-01',
    updatedAt: '2021-08-01',
  },
  {
    id: 5,
    userId: 2,
    title: '할일2',
    doneAt: null,
    createdAt: '2021-08-01',
    updatedAt: '2021-08-01',
  },
  {
    id: 6,
    userId: 2,
    title: '할일2',
    doneAt: null,
    createdAt: '2021-08-01',
    updatedAt: '2021-08-01',
  },
  {
    id: 7,
    userId: 2,
    title: '할일2',
    doneAt: null,
    createdAt: '2021-08-01',
    updatedAt: '2021-08-01',
  },
  {
    id: 8,
    userId: 2,
    title: '할일2',
    doneAt: null,
    createdAt: '2021-08-01',
    updatedAt: '2021-08-01',
  },
];

// 회원가입 API
app.post('/sign-up', (req, res) => {
  const { email, password, rePassword, role, name } = req.body;
  if (!email || !password || !rePassword || !role || !name) {
    res.status(400).send({ message: '입력필드의 필수값이 누락되었습니다.' });
    return;
  }
  const extUser = users.find((usr) => usr.email === email);
  if (extUser) {
    res.status(409).send({ message: 'email이 중복입니다.' });
    return;
  }
  if (password !== rePassword) {
    res.status(400).send({ message: '비밀번호를 확인해주세요.' });
    return;
  }
  const id = getIncrementedId(users);
  const newUser = { email, password, role, name, id };
  users.push(newUser);
  res.send({ message: '회원가입에 성공했습니다.' });
});

// 로그인 API
app.post('/sign-in', (req, res) => {
  const { email, password } = req.body;
  const findUser = users.find((findUsr) => findUsr.email === email);
  if (!findUser) {
    res.status(404).send({ message: '사용자가 존재하지 않습니다' });
    return;
  }
  if (findUser.password !== password) {
    res.status(401).send({ message: '비밀번호가 일치하지 않습니다' });
    return;
  }
  const { password: _password, ...user } = findUser;
  const token = jwt.sign(user, secretKey);
  res.status(200).send({ token });
});

// 내정보 API
app.get('/users/me', authMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

// 할일 목록들 조회 API
app.get('/todo-items', authMiddleware, (req, res) => {
  const user = req.user;
  res.send(todoItems.filter((todoItem) => todoItem.userId === Number(user.id)));
});

// 할일 등록 API
app.post('/todo-items', authMiddleware, (req, res) => {
  const user = req.user;
  const { title } = req.body;
  const newTodoId = getIncrementedId(todoItems);
  const newTodoItem = {
    id: newTodoId,
    userId: Number(user.id),
    title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  todoItems.push(newTodoItem);

  res.send(newTodoItem);
});

// 할일 삭제 API
app.delete('/todo-items/:id', authMiddleware, (req, res) => {
  const userId = req.user.id;

  const id = validateTodoItemId(req);
  // findIndex를 사용해서 빠르게 인덱스를 찾고, 다음으로 이 인덱스를 사용하여 할일객체를 저장한다.
  // 이러면 속도가 빨라진다.
  const deleteItemIndex = todoItems.findIndex((todoItem) => todoItem.id === id);
  const deleteItem = todoItems[deleteItemIndex];

  if (!deleteItem) {
    res.status(404).send({ message: '할일을 찾을 수 없습니다.' });
    return;
  }

  if (deleteItem.userId !== userId) {
    res.status(401).send({ message: '권한이 없습니다.' });
    return;
  }

  todoItems.splice(deleteItemIndex, 1);
  res.send({ result: 'true' });
});

// 할일 완료/미완료 API
app.put('/todo-items/:id', authMiddleware, (req, res) => {
  const id = validateTodoItemId(req);
  const selectItemIndex = todoItems.findIndex((sel) => sel.id === id);
  const selectItem2 = todoItems[selectItemIndex];
  if (selectItemIndex === -1) {
    res.status(404).send({ message: '할일을 찾을 수 없습니다.' });
    return;
  }
  if (selectItem2.userId !== req.user.id) {
    res.status(401).send({ message: '권한이 없습니다.' });
  }
  const selectItem = todoItems.find((sel) => sel.id === Number(id));
  const putItem = {
    ...selectItem,
    doneAt: selectItem.doneAt == null ? new Date() : null,
  };
  todoItems.splice(selectItemIndex, 1, putItem);
  res.status(200).send({ result: 'true' });
});

// 할일 상세 조회 API
app.get('/todo-items/:id', authMiddleware, (req, res) => {
  const id = validateTodoItemId(req);
  const todoItem = todoItems.find((todoItem) => todoItem.id === id);
  res.send(todoItem);
  res.send({ message: '할일 상세조회다.' });
});

// 할일 목록들 조회 API
app.get('/todo-items/search/:keyword', (req, res) => {
  res.send({ message: '할일 상세조회다.' });
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`서버오픈, ${port} 포트`);
});
