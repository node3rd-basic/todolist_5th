import CustomError from "../common/custom.error.js";

export const errorMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.status).json({ message: err.message });
  } else {
    console.error(err);
    res.status(500).json({ message: "서버 에러입니다." });
  }
};
