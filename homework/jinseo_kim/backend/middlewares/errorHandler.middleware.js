

import CustomError from '../common/custom.error.js';

export const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.status).json({ message: err.message });
  } else {
    console.log(err);
    res.status(500).json({ message: 'oops, An error occurred on the server . . .' });
  }
};