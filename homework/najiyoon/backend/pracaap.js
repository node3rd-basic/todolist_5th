import mysql from "mysql2/promise";
import "dotenv/config";

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});
//만약 내가 원하는 이메일로 검색하려면? ("select * from users") 이부분을
// ("select * from users where email = '121323'")
//**1 . const [rows] : 하나를 가져와도 무조건 [] 배열로 할 것
//**2. 변수에 [] 넣기 : 그냥 rows로 넣으면 [rows, fields] 이걸 구조분해 할당을 넣는것
// 즉, await 부터의 코드에 담긴 내용은 = [rows, fields]
// console.log(rows) 라면 이중배열이 되고, 이 때 0번째 인덱스의 배열 찾을 때
// console.log(rows[0]) 로 찾아야함
const [rows] = await connection.execute(
  "select * from users where email = '121323'"
);

console.log(rows);

//즉 execute의 결과는 배열인데[요청한 결과 데이터, 대상 테이블의 필드정보]를 넣어 반환
// const result = [요청한 결과 데이터, 대상 테이블의 필드정보]
// 우리가 필요한건 요청한 결과데이터 이므로 구조분해 할당해서
// const [요청결과데이터] = result
//=> 15번째 줄의 const [rows]
