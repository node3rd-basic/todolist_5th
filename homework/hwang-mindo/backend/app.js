import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
	res.send('Hello word!');
})

app.listen(PORT, () => {
	console.log(PORT, '포트로 서버가 열렸어요!');
})