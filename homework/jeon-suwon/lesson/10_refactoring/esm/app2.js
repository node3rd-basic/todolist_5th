import * as cal from './cal.js';

// 전체 import
console.log(cal);
/*
 {
  div: [Function: div],
  mul: [Function: mul],
  sub: [Function: sub],
  sum: [Function: sum]
}
  객체의 형태로 반환
*/

//사용 방법
console.log(cal.div(1, 2));
console.log(cal.sum(1, 2));
console.log(cal.mul(1, 2));
console.log(cal.sub(1, 2));
