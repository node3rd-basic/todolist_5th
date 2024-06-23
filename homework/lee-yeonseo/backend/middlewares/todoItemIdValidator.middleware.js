//투두아이템 아이디 유효성 검증 미들웨어
export const todoItemIdValidator = (req, res, next) => {
  //req.params에서 투두 아이템 아이디 받아오기
  const todoItemId = Number(req.params.id);

  //아이디가 숫자 타입이 아니라면 오류 반환
  if (isNaN(todoItemId)) {
    res.status(400).json({ message: '할일 id는 숫자 형태로 입력해야 합니다.' });
    return;
  }

  req.todoItemId = todoItemId;
  next();
};
