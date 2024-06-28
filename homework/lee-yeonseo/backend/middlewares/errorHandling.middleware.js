import CustomError from '../common/custom.error.js';

export const errorHandlingMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.status).json({ message: err.message });
  } else {
    console.log(err);
    res.status(500).json({ message: '서버에서 에러가 발생했습니다.' });
  }
};
