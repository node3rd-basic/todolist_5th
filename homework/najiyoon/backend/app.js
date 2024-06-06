//할일 api 만들기 
// # 할일 관리 프로그램 API 명세서

import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json())
//db 대신 변수로 사용중
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
   //타이틀이라고 지정한 것을 바디에 넣어줌
    const { title } = req.body;
    
    const newId = (todoItems[todoItems.length-1]) ? todoItems[todoItems.length-1].id+1 : 1
    const newTodoItem = {
        //고유값을 가져야함. 3번이라고 지정하면 3번 수정할 때 여러개가 나오므로
        //마지막 아이디 +1 
        "id": newId,
        "userId": 1,
         //타이틀: 위에서 선언한 타이틀
        "title": title,
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
//수정
app.put('/todo-items/:id', async (req, res) => {
    
    //파라미터에서 아이디 가져온다
    const id = Number(req.params.id)
    if (isNaN(id)) {
        res.status(400).send({
            "result": false,
            "message": "id 는 숫자여야 합니다."
        })
        return
    }
    //todoItems에서 아이디 찾아서 putdoneat에 넣기 
    const selectedTodoItem = todoItems.find(todoItem => todoItem.id === id)
    if (!selectedTodoItem) {
        res.status(404).send({
            "result": false,
            "message": "해당 아이디를 가진 todo item 이 없습니다."
        })
        return
    }

    const todoItemIndex = todoItems.indexOf(selectedTodoItem)
    todoItems.splice(todoItemIndex, 1,
        {
            ...selectedTodoItem,
            //할일을 다했는지 아닌지 확인수식 : 삼항연산자로 들어감
    // let newDoneAt
    // if (selectedTodoItem.doneAt == null) {
    //     newDoneAt = new Date()
    // } else {
    //     newDoneAt = null
    // }
            doneAt: selectedTodoItem.doneAt == null ? new Date() : null
        })
    res.send({ result: true})
})


//삭제
app.delete('/todo-items/:id', (req, res) => {
    const { id } = req.params
    //매번 +를 쓰는게 더 일을 많이 하는 것이므로.. 숫자라고 지정
    const idAsNumber = Number(id)
    if (!idAsNumber=== NaN){
    res.status(400).send({
        "result": false,
        "message": "id는 숫자여야합니다."
    })
        return
    }
    const indexToDelete = todoItems.findIndex(todoItems => todoItems.id === idAsNumber)
    if (indexToDelete === -1) {
        res.status(404).send({
            "result": false,
            "message": "해당 아이디를 가진 todo item이 없습니다"
        })
       return
        }
        todoItems.slice(indexToDelete, 1)
        res.send({
            "result": true
})
   
    
})

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});

// - 요청자가 값을 전달 하고 백엔드 프로그램이 값을 받는 3가지 방법 정리
// - frontend/index.html 할일 목록들 보여지도록 api 구현
// - frontend/index.html 할밀 목록 추가되도록 api 구현
//[나지윤/remove-modify-todo-item]
