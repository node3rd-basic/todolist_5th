//다음에 다시 설명해주신다 함.
//오늘의 중요포인트 : 트라이 안에서 에러가 나면 캐치로
//일부러 에러를 내고 싶으면 throw new error
const a = 0;
try {
  console.log(a + b);
  throw new Error("에러발생");
} catch (err) {
  //만약 에러가 e라는 에러 객체가 에러라는 클래스의 타입이면 콘솔로그찍고
  if (e instanceof Error) {
    console.log(0);
  } else {
    //아니면 받은 에러 다시 던져라
    throw e;
  }
}
