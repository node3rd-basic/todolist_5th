export const postValidator = (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ message: "할 일은 비워둘 수 없습니다." });
    return;
  }

  next();
};
