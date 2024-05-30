const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World?, i am express");
});

app.listen(port, () => {
  console.log(`${port}로 서버가 열렸습니다!`);
});

// app.get 으로 할일목록 , 할일 목록중 한개 조회 하기 API 생성
//  2번 과제는 기존 homework/{이름}/backend/app.js 에 추가 작성 하시면 됩니다.
// 2번은 할일목록 서비스를 만들기 위한 백엔드 프로그램의 일부 입니다.
// 그래서 작성후에 node app.js 를 통해 실행 시켜보시고 브라우저등에서 호출해서 작성한 것이 잘 조회 되는지까지 해보셔야 합니다.
