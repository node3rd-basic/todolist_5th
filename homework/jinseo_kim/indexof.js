// INDEXOF 함수

// Indexof 메소드는 원본배열에서 특정값의 첫 번쨰 인덱스를 찾는다.

// 01. 요소 검색하여 인덱스 출력하기
// 아래 연습문제는 원본배열에서 찾을 PROPERTIES를 지정하여 해당값의 INDEX를 반환한다.

const numbers1_0 = [0, 1, 2, 3, 4, 5];
const indexofZero = numbers1_0.indexOf(0);
`numbers 배열에서 숫자 ${indexofZero} 인덱스는 ${indexofZero} 입니다. `;

console.log(indexofZero);

const numbers1_1 = [0, 1, 2, 3, 4, 5];
const indexofOne = numbers1_1.indexOf(1);
console.log(
  `numbers 배열에서 숫자 ${indexofOne} 인덱스는 ${indexofOne} 입니다. `
);
console.log(indexofOne);

const numbers1_2 = [0, 1, 2, 3, 4, 5];
const indexofTwo = numbers1_2.indexOf(2);
console.log(
  `numbers 배열에서 숫자 ${indexofTwo} 인덱스는 ${indexofTwo} 입니다. `
);
console.log(indexofTwo);

const numbers1_3 = [0, 1, 2, 3, 4, 5];
const indexofThree = numbers1_3.indexOf(3);
console.log(
  `numbers 배열에서 숫자 ${indexofThree} 인덱스는 ${indexofThree} 입니다. `
);
console.log(indexofThree);

const numbers1_4 = [0, 1, 2, 3, 4, 5];
const indexofFour = numbers1_4.indexOf(4);
console.log(
  `numbers 배열에서 숫자 ${indexofFour} 인덱스는 ${indexofFour} 입니다. `
);
console.log(indexofFour);

const numbers1_5 = [0, 1, 2, 3, 4, 5];
const indexofFive = numbers1_5.indexOf(5);
console.log(
  `numbers 배열에서 숫자 ${indexofFive} 인덱스는 ${indexofFive} 입니다. `
);
console.log(indexofFive);

// 02. 요소를 검색하여, 값이 없는경우 -1 반환
const numbers2_0 = [0, 1, 2, 3, 4, 5];
const indexofSix = numbers2_0.indexOf(6);
console.log(`numbers 배열에서 숫자 6의 인덱스는 ${indexofSix} 입니다. `);

// 03. 요소를 검색하여, 중복된 값이 있을경우 특정 인덱스로부터 첫번째 인덱스만 출력하기
const numbers3_0 = [0, 1, 2, 3, 4, 5, 1, 1, 1];
const indexof3_0 = numbers3_0.indexOf(1);
console.log(`numbers 배열에서 숫자 1의 첫번째 인덱스는 ${indexof3_0} 입니다. `);

const indexof3_1 = numbers3_0.indexOf(1, 2);
console.log(
  `numbers 배열에서 2번 인덱스로부터 숫자 1의 첫번째 인덱스는 ${indexof3_1} 입니다. `
);

const indexof3_2 = numbers3_0.indexOf(1, 7);
console.log(
  `numbers 배열에서 7번 인덱스로부터 숫자 1의 첫번째 인덱스는 ${indexof3_2} 입니다. `
);

const indexof3_3 = numbers3_0.indexOf(1, 8);
console.log(
  `numbers 배열에서 7번 인덱스로부터 숫자 1의 첫번째 인덱스는 ${indexof3_3} 입니다. `
);
