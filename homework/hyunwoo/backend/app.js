import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World!");
});


/** 할일 목록들 조회 API */
app.get('/todo-items', (req, res) => {
const TodoItem = [
    {
      "id": 1,
      "userId": 1,
      "title": "베이직반 과제",
      "doneAt": "2024-06-03",
      "createdAt": new Date(),
      "updatedAt": null
    },
    {
      "id": 2,
      "userId": 2,
      "title": "팀프로젝트",
      "doneAt": "2024-06-07",
      "createdAt": new Date(),
      "updatedAt": null
    },
    {
        "id": 3,
        "userId": 3,
        "title": "알고리즘 코드카타",
        "doneAt": null,
        "createdAt": new Date(),
        "updatedAt": null
      },
      {
        "id": 4,
        "userId": 4,
        "title": "Node.js 공부",
        "doneAt": null,
        "createdAt": new Date(),
        "updatedAt": null
      },
      {
        "id": 5,
        "userId": 5,
        "title": "청소",
        "doneAt": "2024-06-04",
        "createdAt": new Date(),
        "updatedAt": null
      }
  ];
    res.send(TodoItem);
} );


app.listen(port, () => {
    console.log(port, '포트로 연결되었습니다.');
});