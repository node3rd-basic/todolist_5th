import express from "express";
import cors from "cors";

import { errorMiddleware } from "./middleware/error.middleware.js";
import { userRouter } from "./router/user.router.js";
import { todoitemRouter } from "./router/todoitem.rotuer.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use([todoitemRouter, userRouter]);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`${PORT}번의 포트가 열렸습니다.`);
});
