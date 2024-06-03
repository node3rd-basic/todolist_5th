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

//할 일 목록 조회 api
app.get('/todo-items', (req, res) => {
  return res.send(todoItems)
});

//할 일 상세 조회 api
app.get('/todo-items/:id', (req, res) => {
  const id = Number(req.params.id);
  const todoItem = todoItems.find((todoItem) => todoItem.id === id);

  return res.send(todoItem)
});

app.listen(port, () => {
  console.log(`${port}로 서버가 열렸습니다!`);
});
