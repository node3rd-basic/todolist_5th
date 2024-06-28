export function validateTodoItemId(req) {
  // req.params.id를 숫자로 변환 하고, idAsNumber에 저장한다.
  const idAsNumber = Number(req.params.id);
  // idAsNumber이 NaN(Not a Number)이면 에러를 던진다.
  if (isNaN(idAsNumber)) {
    throw new Error('Id must be a number');
  }
  // 위의 로직을 패스하면 idAsNumber를 반환한다.
  return idAsNumber;
}
