app.get("/todo-items", (req, res) => {
  const todos = [
    { id: 1, task: "코딩 연습하기" },
    { id: 2, task: "과제하기" },
    { id: 3, task: "책 읽기" },
    { id: 4, task: "운동하기" },
    { id: 5, task: "친구와 만나기" },
    { id: 6, task: "쇼핑하기" },
  ];

  return res.status(200).json({ todos });
});

app.get("/todo-items/:todoId", (req, res) => {
  const id = Number(req.params.todoId);

  const todos = [
    { id: 1, task: "코딩 연습하기" },
    { id: 2, task: "과제하기" },
    { id: 3, task: "책 읽기" },
    { id: 4, task: "운동하기" },
    { id: 5, task: "친구와 만나기" },
    { id: 6, task: "쇼핑하기" },
  ];

  const todoItem = todos.find((todo) => todo.id === id);

  return res.status(200).json({ todoItem });
});
