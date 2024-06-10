// express를 사용할 수 있도록 로드
import express from 'express';

// 어플리케이션 정의
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send(
    `라우트 콜백함수의 매개변수 순서에
    오류가 있으면 에러가 발생하는군요.
    노드몬도 잘 실행 되네요~ `
  );
});

app.listen(PORT, () => {
  console.log(`app listening on port "${PORT}"`);
});
