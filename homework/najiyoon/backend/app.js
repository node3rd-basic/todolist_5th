// express 사용법 작성
// pull request에 json 내용정리작성
//여지껏 package.json은 당연히 밖에다 저장되는 줄 알았는데 파일을 선택해서 들어오니 안에만 가능..
//yarn init -y 하고 yarn add express 함
// app.js
// express 사용할 수 있도록 함
import express from 'express';
//통신 가능 프로그램 정의, 연결포트 정의
const app = express();
const PORT = 3000;
//내가 요청받을 메뉴판 /주소로, 
app.get('/', (req, res) => {
  res.send('Hello World!');
});
//항상듣고 있어, 포트번호 3000번 열고 듣고 있다가 콘솔에 찍어줘
app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});

//import express from 'express';
//const app = express();
//const PORT = 3000;
//app.get('/', (req, res) => {
    // return 
// })
