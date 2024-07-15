import CustomError from "../common/custom.error.js";

export default function errorMiddleware(err, req, res, next) {
  err instanceof CustomError
  ? res.status(err.status).send({ message: err.message })
  : res.status(500).send({ message: "에러가 발생했습니다."});
}