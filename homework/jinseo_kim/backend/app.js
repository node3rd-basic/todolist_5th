const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World?, i am express");
});

app.listen(port, () => {
  console.log(`${port}로 서버가 열렸습니다!`);
});
