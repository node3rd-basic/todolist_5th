export const keywordValidator = (req, res, next) => {
  const { keyword } = req.params;

  if (keyword.trim() === "") {
    res.status(400).json({ message: "검색어를 입력해주세요." });
    return;
  }

  next();
};
