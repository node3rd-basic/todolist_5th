import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// 할일 목록들 조회
app.get('/todo-items', (req, res) => {});

//할일 목록 한개 조회
app.get('/todo-items/:id', (req, res) => {});

//할일 목록들 조회 --키워드 검색
app.get('/todo-item/search/:keyword', (req, res) => {});

//할일 등록
app.post('/todo-items', (req, res) => {});

//할일 완료 여부 토글
app.post('/todo-items/:id', (req, res) => {});

//할일 삭제
app.delete('/todo-items/:id', (req, res) => {});

//로그인
app.post('/sign-in', (req, res) => {});

//회원가입
app.post('/sign-up', (req, res) => {});

//내 정보 가져오기
app.get('/users/me', (req, res) => {});

app.listen(port, () => {
  console.log(`${port}번 포트로 서버가 열렸습니다.`);
});
