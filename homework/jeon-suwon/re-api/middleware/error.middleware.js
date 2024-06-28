import { CustomError } from "../common/custom.error.js";

export const errorMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    console.error(err);
    res.status(err.status).send({ message: err.message });
  } else {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
