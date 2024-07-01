import customError from "../common/custom.error.js";

export default function errorMiddleware(err, req, res, next) {
  if (err instanceof customError) {
    res.status(err.status).send({ message: err.message });
  } else {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
}
