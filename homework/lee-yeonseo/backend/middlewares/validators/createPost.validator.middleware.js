export const createPostValidator = (req, res, next) => {
  const { title } = req.body;

  //title을 입력하지 않았다면 오류 반환
  if (!title) {
    res.status(400).json({ message: '할일 내용을 입력해주세요.' });
    return;
  }

  next();
};
