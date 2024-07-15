import CustomError from "../common/custom.error.js";

// 에러처리 미들웨어!
export default function errorMiddleware(err, req, res, next) {
  if (err instanceof CustomError) {
    res.status(err.status).send({ message: err.message });
  } else {
    console.error(err);
    res.status(500).send({ message: "무언가 잘못 됐습니다." });
  }
}

// //
// res.status(500).json({
//   message: "Internal Server Error",
// });
// next();
