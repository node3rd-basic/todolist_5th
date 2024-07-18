import CustomError from "../common/custom.error.js";

export const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.status).json({ message: err.message });
  } else {
    console.log(err);
    res
      .status(500)
      .json({
        message: "알 수 없는 에러가 발생했습니다. 관리자에게 문의해주세요.",
      });
  }
};
