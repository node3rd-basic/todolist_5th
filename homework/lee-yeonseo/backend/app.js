import express from 'express';
import cors from 'cors';

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
    userId: 1,
    title: '할일2',
    doneAt: '2021-08-01',
    createdAt: '2021-08-01',
    updatedAt: '2021-08-01',
  },
];

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('안녕하세요');
});

//할 일 목록 조회 api
app.get('/todo-items', (req, res) => {
  return res.send(todoItems);
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

  const newTodoId = todoItems[todoItems.length - 1] ? todoItems[todoItems.length - 1].id + 1 : 1;

  const newTodoItem = {
    id: newTodoId,
    userId: 1,
    title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };

  todoItems.push(newTodoItem);

  return res.send(newTodoItem);
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

app.listen(port, () => {
  console.log(`${port}로 서버가 열렸습니다!`);
});
