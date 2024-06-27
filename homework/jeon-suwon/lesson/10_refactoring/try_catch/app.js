const A = () => {
  try {
    const a = 10;
    const b = 20;
    console.log(a + b);
  } catch (e) {
    console.log("error");
  } // 20
};
/*코드를 동작해보면 20이라는 console을 잘 출력하는것을 볼 수있음 ..

그러나 
아래와 같이 강제적으로 에러를 발생시킨다면 throw new Error 사용 */

const B = () => {
  try {
    const a = 10;
    const b = 20;
    throw new Error("에러발생");
    console.log(a + b);
  } catch (e) {
    console.log("error");
  } // error
};
/* 중간에 강제적으로 에러를 발생시켜 catch 문으로 넘어가 error 콘솔을 출력시키고
그 아래의 내용은 더 이상 동작을 하지않는것을 볼 수 있다. */

const C = () => {
  try {
    const a = 10;
    const b = 20;
    throw new Error("에러발생");
    console.log(a + b);
  } catch (e) {
    console.log("good");
  } finally {
    const a = 10;
    console.log(a * b);
  } //200
};

/* 이와 같이 a + b의 콘솔이 출력이 되지는 않지만 에러와 상관없이 finally의 a * b의 콘솔값
출력이 되는것을 확인 할 수 있다... */

A();
B();
C();
