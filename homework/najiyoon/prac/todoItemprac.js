export function putTodoItem(req, res, next) {
  //내가 원하는 할일 목록 아이디 찾기, 아이디는 숫자

  //1. number인지 아닌지 구분하기
  //컨트롤러-에서는 id가져온 것만 두고 if는 서비스로
  const id = Number(req.params.id);
  //?? 여기에 id 에 연동해서 만들어도 되는지, 아니면 새로운 함수를 만들지
  //만들었다면 그 함수를 id대신 사용해야하는지

  //service-에서는 id 숫자인지 검증

  // export function findIdIsNaN(id) {const isNaN = Number(id)
  if (!isNaN(id)) {
    res.status(400).send({
      result: false,
      message: "id 는 숫자여야 합니다.",
    });
    return;
  }

  //원하는 목록 중 todoItems.id할일 1개 찾기 : 내 할일목록에서 내가 원하는 번호의 목록 하나 수정하기
  //할일목록 배열에서 할일 찾기
  const reInPutTodoItem = todoItems.find((todoItems) => todoItems.id === id);
  if (!reInPutTodoItem) {
    res
      .status(404)
      .send({ result: false, message: "해당하는 게시글이 없습니다." });
  }
  //수정할 수식 : 내가 원하는 투두아이템 필요함 : reInPutTodoItem /
  //indexof사용 이유 : 내가 수정할 위치에 splice로 수정하기 위함
  //할일 완료 여부 : done / null이면 날짜로, 날짜면 null로

  //수정
  const putItemIndex = todoItems.indexOf(reInPutTodoItem);
  todoItems.splice(putItemIndex, 1, {
    ...reInPutTodoItem,
    doneAt: reInPutTodoItem.doneAt === null ? new Date() : null,
  });

  //반환
  res.send({ result: true });
}
//수정전
