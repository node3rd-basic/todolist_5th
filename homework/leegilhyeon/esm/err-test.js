/** try catch 정리, 연습 **/

// try안에서 err 나면 catch로 받는다
try {
  const name = "길현";
  const say = "안녕";
  console.log(name + say);
  console.log("err 테스트중 에러 안남");
  throw new Error("에러 발생");
} catch (e) {
  //e 객체받아옴
  console.log(0);
} finally {
  console.log("무조건 실행되는 친구");
}

try {
  const a = 20;
  console.log(a + b);
} catch (e) {
  console.log("실패");
}

try {
  const a = 20;
  const b = 12;
  console.log(a + b);
  throw new Error("에러 던져버리기");
} catch (e) {
  console.log("실패");
}

try {
  const a = 10;
  if (a !== 0) {
    throw new Error();
  } else {
    console.log(a);
  }
} catch (e) {
  console.log("0이 아니네요");
}
