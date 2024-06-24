import todoItems from "../db/todoitems.js";

const validateTodoItemId = (req) => {
  const idAsNumber = Number(req.params.id);
  if (isNaN(idAsNumber)) {
    throw new Error("Id는 숫자여야합니다.");
  }

  return idAsNumber;
};

const getTodoItemById = (id) => {
  const todoItem = todoItems.find((todoItem) => todoItem.id === id);
  if (!todoItem) {
    throw new Error("Todo item not found");
  }

  return todoItem;
};

export function getTodoItems(req, res) {
  const user = req.user;

  res.send(todoItems.filter((todoItem) => todoItem.userId === user.id));
}

export function postTodoItem(req, res) {
  const { title } = req.body;
  const user = req.user;
  const newId = getIncrementedId(todoItems);
  const newItem = {
    id: newId,
    userId: user.id,
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };

  todoItems.push(newItem);
  res.send(newItem);
}

export function getTodoItem(req, res) {
  const id = validateTodoItemId(req);
  const todoItem = getTodoItemById(id);
  res.send(todoItem);
}

export function putTodoItem(req, res) {
  const id = validateTodoItemId(req);

  // :id로 입력 받은 값이 todoItems에 있는지 확인 작업
  // 여기서 이걸 쓰는 이유! const AddtodoItem에서 ...을 쓸 때 뽑아 쓸 {} 전체를 가져와야하니까 찾는 것!
  const checkTodoItem = getTodoItemById(id);

  // 수정될 id값이 어디인지 todoItems에서 찾는 작업 ex) :id가 3이면 3번위치 자리
  // 여기는 실질적인 객체{} 데이터가 아닌 위치만 찾는다.
  const todoItemsIndex = todoItems.indexOf(checkTodoItem);

  const newDoneAt = checkTodoItem.doneAt === null ? new Date() : null;

  // 수정할 위치에서 자르고 수정할 값 넣는 작업.
  const addtodoItem = todoItems.splice(todoItemsIndex, 1, {
    ...checkTodoItem,
    doneAt: newDoneAt,
  });

  res.send({
    result: true,
    data: addtodoItem,
  });
}

export function deleteTodoItem(req, res) {
  const id = validateTodoItemId(req);
  const selectedTodoItem = getTodoItemById(id);
  console.log("selectedTodoItem", selectedTodoItem);
  const indexTodoItem = todoItems.indexOf(selectedTodoItem);

  todoItems.splice(indexTodoItem, 1);

  res.send({
    result: true,
  });
}

// 사실 속에 return문도 들어 있다.
// 화살표 함수의 축약형 형태로 작성되었기 때문에 {}랑 같이 생략된 것
// 설명 arr[todoItems.length - 1] 에서 todoItems.length = 2, 2 - 1은 1 => arr[1]요소
// 즉 arr이 가지고 있는 마지막 요소가 존재하는가?
// 배열에 마지막 요소가 있어? (todoItems[todoItems.length - 1])
// ? 있으면 +1을 해!
// : 아니면 1 이라고 해!    <- 이렇게 이해해야 한다.
// 정확히는 todoItems[0]은 { id: 1, ...}을 의미 따라서 [0 - 1] => [-1] 은 애초에 todoItems 속 요소가 없다는 것을 의미
// 그렇기 때문에 [todoItems.length - 1] 의 값이 -1이 아니라면 id 값에 + 1을 하고 아니라면 id 를 1이라고 해서 id 값 위치에 넣어서 요소를 탄생 시켜라가 된다.

const getIncrementedId = (arr) =>
  arr[arr.length - 1] ? arr[arr.length - 1].id + 1 : 1;
