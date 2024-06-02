import express  from 'express';
import cors from 'cors'

const app = express();
const port = 3000;

const todoItems = [
  {
    "id": 1,
    "userId": 1,
    "title": "할일1",
    "doneAt": "2021-08-01",
    "createdAt": "2021-08-01",
    "updatedAt": "2021-08-01"
  },
  {
    "id": 2,
    "userId": 1,
    "title": "할일2",
    "doneAt": "2021-08-01",
    "createdAt": "2021-08-01",
    "updatedAt": "2021-08-01"
  }
]

app.use(cors())

app.get('/', (req, res) => {
  res.send('안녕하세요');
});

//할일 목록 조회 api
app.get('/todo-items', (req, res) => {
  return res.send(todoItems)
});

app.get('/todo-items/:todoId', (req, res) => {
  const id = Number(req.params.todoId);

  const todos = [
    { id: 1, task: '코딩 연습하기' },
    { id: 2, task: '과제하기' },
    { id: 3, task: '책 읽기' },
    { id: 4, task: '운동하기' },
    { id: 5, task: '친구와 만나기' },
    { id: 6, task: '쇼핑하기' },
  ];

  const todoItem = todos.find((todo) => todo.id === id);

  return res.status(200).json({ todoItem });
});

app.listen(port, () => {
  console.log(`${port}로 서버가 열렸습니다!`);
});
