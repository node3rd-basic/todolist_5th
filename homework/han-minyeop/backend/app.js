import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

//yarn add express cors jsonwebtoken 3개 동시 설치

// express 로드
const app = express();
const port = 3000;

// 미들웨어 추가
app.use(cors());
app.use(express.json());

// 에러 미들웨어
const errorMiddleware = (err, req, res, next) => {
  res.status(500).json({
    message: "Internal Server Error",
  });
};

// 시크릿키
const secretKey = 'eyJhbGciOiJIUzI1NInR5cCI6IkpXVCJ9';

// 할일 목록
const todoItems = [
    {
        "id": 1,
        "userId": 1,
        "title": "코드카타",
        "doneAt": null,
        "createdAt": "2024-05-24",
        "updatedAt": "2024-05-24",
    },
    {
        "id": 2,
        "userId": 1,
        "title": "강의 듣기",
        "doneAt": null,
        "createdAt": "2024-05-24",
        "updatedAt": "2024-05-24",
    },
    {
        "id": 3,
        "userId": 1,
        "title": "내용 정리하기",
        "doneAt": "2024-05-24",
        "createdAt": "2024-05-24",
        "updatedAt": "2024-05-24",
    },
    {
        "id": 4,
        "userId": 1,
        "title": "숙제하기",
        "doneAt": null,
        "createdAt": new Date(),
        "updatedAt": null
    },
    {
        "id": 5,
        "userId": 1,
        "title": "TIL 작성하기",
        "doneAt": null,
        "createdAt": new Date(),
        "updatedAt": null
    },
]

// 사용자 목록
const users = [
    {
      id: 1,
      email: 'minyeop0423@naver.com',
      password: '1234',
      role: 'student',
      name: '한민엽',
    }
  ];

// JWT 검증하여 사용자 권한 확인
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({"message":"권한이 없습니다."});
  }
  try {
    req.user = jwt.verify(token, secretKey);
    next();
  } catch (error) {
    res.status(401).send({"message":"권한이 없습니다."});
  }
}

// 할일 생성 
app.post("/todo-items", authMiddleware, (req, res) => {
  const {title} = req.body;
  const user = req.user;
  const newId = (todoItems[todoItems.length-1]) ? todoItems[todoItems.length -1].id +1 : 1;
  const newTodoItem = {
      "id": newId,
      "userId": user.id,
      "title": title,
      "doneAt": null,
      "createdAt": new Date(),
      "updatedAt": null
  };
  todoItems.push(newTodoItem);
  return res.send(newTodoItem);
});

// 모든 할일 목록 조회
app.get("/todo-items", authMiddleware, (req, res) => {
  const user = req.user;
  return res.send(todoItems.filter((todoItem) => todoItem.userId === user.id));
});

// 특정 할일 조회
app.get("/todo-items/:todoId", authMiddleware, (req, res) => {
  const id = Number(req.params.todoId);
  const user = req.user;
  const selectedTodoItem = todoItems.find((todoItem) => todoItem.id === id);

  if (!selectedTodoItem) {
    return res.status(404).json({ message: '해당 아이디의 할 일이 존재하지 않습니다.' });
  }

  if (selectedTodoItem.userId !== user.id) {
    return res.status(401).json({ message: '접근 권한이 없는 투두 목록입니다.' });
  }

  return res.send(selectedTodoItem);
});

// 할일 수정
app.put("/todo-items/:id", authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const user = req.user;

  if (isNaN(id)) {
      res.status(400).send({message:"id는 숫자여야 합니다."});
      return;
  }
  const todoItemFind = todoItems.find(todoItem => todoItem.id === id);
  if (!todoItemFind) {
    res.status(404).send({message:"해당 아이디를 가진 todoItem이 없습니다."});
    return;
  }

  if (todoItemFind.userId !== user.id) {
    return res.status(401).json({ message: '수정 권한이 없습니다.' });
  }

  const todoItemIndex = todoItems.indexOf(todoItemFind);
  todoItems.splice(todoItemIndex, 1, {
    ...todoItemFind,
    doneAt: todoItemFind.doneAt == null ? new Date() : null
  });
  res.send({message:"수정되었습니다."});
});

// 할일 삭제
app.delete('/todo-items/:id', authMiddleware, (req, res)=> {
  const { id } = req.params;
  const numberId = Number(id);
  const user = req.user;

  if(isNaN(numberId)) {
      res.status(400).send({message:"id는 숫자여야 합니다."});
      return;
  }

  const todoItemIndex = todoItems.findIndex((todoItem) => todoItem.id === numberId);

  if (todoItemIndex === -1) {
    return res.status(400).json({ message: '해당 아이디의 할 일이 존재하지 않습니다.' });
  }

  if (todoItems[todoItemIndex].userId !== user.id) {
    return res.status(401).json({ message: '삭제 권한이 없습니다.' });
  }

  todoItems.splice(todoItemIndex, 1);
  return res.send({ message: "삭제되었습니다." });
});

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

// 회원가입
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

// 로그인
app.post('/sign-in', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
  }

  const { password: _pw, ...userWithoutPassword } = user;
  const token = jwt.sign(userWithoutPassword, secretKey);
  return res.status(200).json({ token });
});

// 토큰 검증
app.get('/users/me', authMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

// 에러 미들웨어 사용
app.use(errorMiddleware);

// 서버 실행
app.listen(port, () => {
  console.log(`${port}번 포트로 연결되었습니다.`);
});
