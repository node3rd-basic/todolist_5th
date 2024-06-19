import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;

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
    userId: 2,
    title: '222할일',
    doneAt: '2021-08-01',
    createdAt: '2021-08-01',
    updatedAt: '2021-08-01',
  },
];
const users = [
  {
    id: 1,
    email: 'nongdam@example.com',
    name: 'lys',
    password: '1234',
    role: 'studend',
    createdAt: '2024-06-14T12:48:54.718Z',
  },
];

// 에러 핸들링 미들웨어
const errorHandlingMiddleware = (err, req, res, next) => {
  res.status(500).json({ message: err.message });
};

//사용자 인증 미들웨어
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = jwt.verify(token, tokenSecretKey);

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: '접근 권한이 없습니다.' });
  }
};

// 토큰 시크릿 키
const tokenSecretKey = '코딩은 너무 어려워...';

// 투두아이템, 유저 아이디 생성
const newIncrementedId = (arr) => (arr[arr.length - 1] ? arr[arr.length - 1].id + 1 : 1);

//투두아이템 삭제
const getTodoItemById = (id) => {
  const todoItem = todoItems.find((todoItem) => todoItem.id === id);
  if (!todoItem) {
    throw new Error('해당 아이디의 할 일이 존재하지 않습니다.');
  }
  return todoItem;
};

//투두 아이템 필터링
const filteredTodoItems = (userId) => {
  const filteredTodoItems = todoItems.filter((todoItem) => todoItem.userId === userId);
  return filteredTodoItems;
};

//입력한 투두 아이템의 아이디 유효성 검증
const todoItemValidator = (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: '아이디는 숫자 형태로 입력해야 합니다.' });
  }
  req.id = id;
  next();
};

app.use(cors());
app.use(express.json());

//할일 목록들 키워드로 조회
app.get('/todo-items/search/:keyword', authMiddleware, (req, res) => {
  const { keyword } = req.params;
  const userId = req.user.id;

  // 키워드 필터링
  const filteredTodoItemsByKeyword = todoItems.filter(
    (todoItem) => todoItem.title.includes(keyword) && todoItem.userId === userId,
  );

  res.status(200).json(filteredTodoItemsByKeyword);
});

//할일 목록들 조회
app.get('/todo-items', authMiddleware, (req, res) => {
  const { id } = req.user;

  res.json(filteredTodoItems(id));
});

//할일 목록 한개 조회
app.get('/todo-items/:id', authMiddleware, todoItemValidator, (req, res) => {
  const user = req.user;
  const id = req.id;

  const todoItem = getTodoItemById(id);
  if (user.id !== todoItem.userId) {
    return res.status(401).json({ message: '접근권한이 없는 아이템입니다.' });
  }

  return res.json(todoItem);
});

//할일 등록
app.post('/todo-items', authMiddleware, (req, res) => {
  const { title } = req.body;
  const { id } = req.user;

  const newTodoId = newIncrementedId(todoItems);

  const newTodoItem = {
    id: newTodoId,
    userId: id,
    title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };

  todoItems.push(newTodoItem);

  return res.json(newTodoItem);
});

//할일 완료 여부 토글
app.put('/todo-items/:id', authMiddleware, todoItemValidator, (req, res) => {
  const userId = req.user.id;
  const id = req.id;

  const selectedTodoItem = getTodoItemById(id);

  if (selectedTodoItem.userId !== userId) {
    return res.status(401).json({ message: '수정 권한이 없습니다.' });
  }

  const itemIndex = todoItems.indexOf(selectedTodoItem);

  todoItems.splice(itemIndex, 1, { ...selectedTodoItem, doneAt: selectedTodoItem.doneAt == null ? new Date() : null });

  res.json({ result: true });
});

//할일 삭제
app.delete('/todo-items/:id', authMiddleware, todoItemValidator, (req, res) => {
  const userId = req.user.id;
  const id = req.id;

  const selectedTodoItem = getTodoItemById(id);
  if (selectedTodoItem.userId !== userId) {
    return res.status(401).json({ message: '삭제 권한이 없습니다.' });
  }

  const itemIndex = todoItems.indexOf(selectedTodoItem);

  todoItems.splice(itemIndex, 1);

  res.status(200).json({ result: true });
});

//로그인
app.post('/sign-in', (req, res) => {
  const { email, password } = req.body;
  const { password: _pw, ...user } = users.find((user) => user.email === email && user.password === password);
  if (!user) {
    return res.status(400).json({ message: '유저를 찾을 수 없습니다.' });
  }

  const token = jwt.sign(user, tokenSecretKey);
  res.status(200).json({ token });
});

//회원가입
app.post('/sign-up', (req, res) => {
  //바디에서 데이터 받아오기
  const { email, password, rePassword, role, name } = req.body;
  //입력된 데이터가 없다면 오류
  if (!email || !password || !rePassword || !role || !name) {
    return res.status(400).json({ message: '입력값을 확인해주세요' });
  }
  //입력된 비밀번호와 비밀번호 확인이 일치하지 않는다면 오류
  if (password !== rePassword) {
    return res.status(400).json({ message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' });
  }
  //이미 가입된 이메일이면 오류
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: '이미 가입된 이메일입니다.' });
  }

  const id = newIncrementedId(users);

  const newUser = { id, email, password, role, name, createdAt: new Date() };

  users.push(newUser);
  return res.status(201).json({ newUser });
});

//내 정보 가져오기
app.get('/users/me', authMiddleware, (req, res) => {
  const { password: _pw, iat: _iat, ...user } = req.user;
  return res.status(200).json(user);
});

app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`${port}번 포트로 서버가 열렸습니다.`);
});
