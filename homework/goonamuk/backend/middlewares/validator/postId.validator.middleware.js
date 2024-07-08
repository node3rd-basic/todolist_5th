export const postIdValidator = (req, res, next) => {
  const postId = Number(req.params.id);

  if (isNaN(postId)) {
    res.status(400).json({ message: "할 일 id는 숫자 형태여야 합니다." });
    return;
  }

  if (!postId) {
    res.status(404).json({ message: "Todo item not found" });
    return;
  }

  req.postId = postId;
  next();
};
