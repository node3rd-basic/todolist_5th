//할일 api 만들기 
// # 할일 관리 프로그램 API 명세서

import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json())

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
        "doneAt": null,
        "createdAt": "2021-08-01",
        "updatedAt": "2021-08-01"
    }
]

//할일목록조회
app.get('/todo-items', (req, res) => {
    
    res.send(todoItems);
})

app.post('/todo-items', (req, res) => {
    const { title } = req.body;
    //타이틀이라고 지정한 것을 바디에 넣어줌
    const newId = (todoItems[todoItems.length-1]) ? todoItems[todoItems.length-1].id+1 : 1
    const newTodoItem = {
        //고유값을 가져야함. 3번이라고 지정하면 3번 수정할 때 여러개가 나오므로
        //마지막 아이디 +1 
        "id": newId,
        "userId": 1,
        "title": title,
        //타이틀: 위에서 선언한 타이틀
        "doneAt": null,
        "createdAt": new Date(),
        "updatedAt": "2024-06-01"
    }
    todoItems.push(newTodoItem)
    res.send(newTodoItem)
}
)

//할일목록 1개 조회
app.get('/todo-itmes/:id', (req, res, next) => {
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
            "doneAt": "null",
            "createdAt": "2021-08-01",
            "updatedAt": "2021-08-01"
        }

    ];
    const TodoItem = TodoItems.find((TodoItem) =>
        TodoItem.id === +id)
    res.send(TodoItem);
});

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});
// - 과제 명 register-todo-item
// - 요청자가 값을 전달 하고 백엔드 프로그램이 값을 받는 3가지 방법 정리
// - frontend/index.html 할일 목록들 보여지도록 api 구현
// - frontend/index.html 할밀 목록 추가되도록 api 구현


