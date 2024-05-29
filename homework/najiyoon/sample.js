
//할일 api 만들기 
// # 할일 관리 프로그램 API 명세서

import express from "express";
const app = express();
const routers = express.Router();

//할일목록조회
routers.get('/todo-items', (req, res, next) => {
const TodoItems = [
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
res.send(TodoItems);
})

//할일목록 1개 조회
    routers.get('/todo-itmes/:id', (req, res, next) => {
       const id = req.params.id
       const TodoItems = [
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

       ];
       const TodoItem = TodoItems.find((TodoItem)=>
        TodoItem.id === +id)
      res.send(TodoItem);
    });
       
export default routers;