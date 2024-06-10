// FINDINDEX 함수

// FINDINDEX 메소드는 원본배열을 사용자가 지정한 콜백함수를 사용하여 조건에 해당되는 인덱스를 검색하고 반환한다.

// 01. 주어진 배열에서 기준보다 큰 조건에 해당하는 요소 검색하기
const numbers1_0 = [0, 1, 2, 3, 4, 5];
const indexof1_0 = numbers1_0.findIndex((findThreeOver) => findThreeOver > 3);
console.log(
  `numbers 배열에서 숫자 3보다큰 숫자의 인덱스는 ${indexof1_0} 입니다. `
);

const numbers1_1 = [0, 1, 2, 3, 4, 5];
const indexof1_1 = numbers1_0.findIndex((findFourOver) => findFourOver > 4);
console.log(
  `numbers 배열에서 숫자 4보다큰 숫자의 인덱스는 ${indexof1_1} 입니다. `
);

const numbers1_2 = [0, 1, 2, 3, 4, 5];
const indexof1_2 = numbers1_0.findIndex((findFiveOver) => findFiveOver > 5);
console.log(
  `numbers 배열에서 숫자 5보다큰 숫자의 인덱스는 ${indexof1_2} 입니다. `
);

// 02. 주어진 배열에서 짝수 또는 홀수 조건에 해당하는 요소 검색하기
const numbers2_0 = [1, 3, 4, 5];
const indexOf2_0 = numbers2_0.findIndex((findEven) => findEven % 2 == 0);
console.log(
  `numbers 배열에서 짝수에 해당하는 숫자의 첫번째 인덱스는 ${indexOf2_0} 입니다. `
);

const numbers2_1 = [0, 2, 4, 5];
const indexOf2_1 = numbers2_1.findIndex((findOdd) => findOdd % 2 == 1);
console.log(
  `numbers 배열에서 홀수에 해당하는 숫자의 첫번째 인덱스는 ${indexOf2_1} 입니다. `
);
