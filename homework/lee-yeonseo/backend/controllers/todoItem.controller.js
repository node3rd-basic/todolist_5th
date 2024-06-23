import todoItems from '../db/todoItems.js';

//투두아이템 아이디, 유저 아이디 생성
const getIncrementedId = (arr) => (arr[arr.length - 1] ? arr[arr.length - 1].id + 1 : 1);

//해당하는 투두 아이템 아이디의 할일 찾기
const findTodoItem = ({ todoItemId, userId }) => {
  //req.params로 받은 아이디의 할일 찾기
  const selectedTodoItem = todoItems.find((todoItem) => todoItem.id === todoItemId);

  //해당 아이디의 할일이 존재하지 않으면 오류 반환
  if (!selectedTodoItem) {
    throw new Error('해당 아이디의 할 일이 존재하지 않습니다.');
  }

  //찾은 할일의 유저 아이디와 req.user로 받은 유저 아이디가 불일치하면 오류 반환
  if (selectedTodoItem.userId !== userId) {
    throw new Error('접근 권한이 없는 할 일입니다.');
  }

  return selectedTodoItem;
};

//할일 목록 조회
export const getTodoItems = (req, res) => {
  //사용자 인증 미들웨어에서 유저 아이디 받아오기
  const userId = req.user.id;

  //해당 유저가 작성한 투두 아이템만 찾기
  const myTodoItems = todoItems.filter((todoItem) => todoItem.userId === userId);

  res.status(200).json(myTodoItems);
};

//할일 목록 상세 조회
export const getTodoItem = (req, res) => {
  //req.params에서 투두아이템 아이디 받아오기
  const { todoItemId } = req;
  //사용자 인증 미들웨어에서 유저의 id 받아오기
  const userId = req.user.id;

  //투두아이템 목록에서 req.params에서 받아온 id와 일치하는 아이템 찾기
  const selectedTodoItem = findTodoItem({ todoItemId, userId });

  res.status(200).json(selectedTodoItem);
};

//할일 등록
export const postTodoItem = (req, res) => {
  //인증 미들웨어로 userId 받아오기
  const userId = req.user.id;
  //req.body에서 title 받아오기
  const { title } = req.body;

  //title을 입력하지 않았다면 오류 반환
  if (!title) {
    res.status(400).json({ message: '할일 내용을 입력해주세요.' });
    return;
  }

  //투두 아이템 아이디 생성하기
  const newTodoItemId = getIncrementedId(todoItems);

  //newTodoItem 생성
  const newTodoItem = {
    id: newTodoItemId,
    userId,
    title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };

  //todoItems 목록에 newTodoItem 추가
  todoItems.push(newTodoItem);

  res.status(201).json(newTodoItem);
};

//할일 완료 여부 토글
export const putTodoItem = (req, res) => {
  //투두 아이템 아이디 파싱
  const { todoItemId } = req;
  //유저 아이디 파싱
  const userId = req.user.id;

  //해당하는 투두 아이템 아이디의 할일 찾기
  const selectedTodoItem = findTodoItem({ todoItemId, userId });

  //찾은 투두 아이템의 인덱스 찾기
  const selectedTodoItemIndex = todoItems.indexOf(selectedTodoItem);

  //splice로 투두 아이템의 doneAt 수정
  todoItems.splice(selectedTodoItemIndex, 1, {
    ...selectedTodoItem,
    doneAt: selectedTodoItem.doneAt == null ? new Date() : null,
  });

  res.status(200).json({ result: true });
};

//할일 삭제
export const deleteTodoItem = (req, res) => {
  //투두 아이템 아이디 파싱
  const { todoItemId } = req;
  //유저 아이디 파싱
  const userId = req.user.id;

  //해당하는 아이디의 투두아이템 찾기
  const selectedTodoItem = findTodoItem({ todoItemId, userId });

  //찾은 투두 아이템의 인덱스 찾기
  const selectedTodoItemIndex = todoItems.indexOf(selectedTodoItem);

  //splice로 투두 아이템 삭제
  todoItems.splice(selectedTodoItemIndex, 1);

  res.status(200).json({ result: true });
};
