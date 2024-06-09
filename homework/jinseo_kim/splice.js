// SPLICE 함수

// Splice 메소드는 원본 배열의 데이터를 직접 수정하고, 이를 반환하는 메소드다.

// 01. 요소 삭제하기 (DELETE)
// 아래 연습문제는 INDEX를 지정하고, 삭제할 COUNTER를 지정하여 number 배열에서 하나의 숫자를 삭제한다.
// splice 삭제할 INDEX, 삭제할 COUNTER

const numbers0_0 = [0, 1, 2, 3, 4, 5];
const deleteZero = numbers0_0.splice(0, 1);
console.log(deleteZero);
console.log(numbers0_0);
console.log("........................");

const numbers0_1 = [0, 1, 2, 3, 4, 5];
const deleteOne = numbers0_1.splice(1, 1);
console.log(deleteOne);
console.log(numbers0_1);
console.log("........................");

const numbers0_2 = [0, 1, 2, 3, 4, 5];
const deleteTwo = numbers0_2.splice(2, 1);
console.log(deleteTwo);
console.log(numbers0_2);
console.log("........................");

const numbers0_3 = [0, 1, 2, 3, 4, 5];
const deleteTree = numbers0_3.splice(3, 1);
console.log(deleteTree);
console.log(numbers0_3);
console.log("........................");

const numbers0_4 = [0, 1, 2, 3, 4, 5];
const deleteFour = numbers0_4.splice(4, 1);
console.log(deleteFour);
console.log(numbers0_4);
console.log("........................");

const numbers0_5 = [0, 1, 2, 3, 4, 5];
const deleteFive = numbers0_5.splice(5, 1);
console.log(deleteFive);
console.log(numbers0_5);
console.log("........................");

// 02. 요소 추가하기 (ADD)
// 아래 연습문제는 INDEX를 지정하고, 추가할 PROPERTY를 지정하여 number 배열에서 두개의 숫자를 추가한다.
// splice 추가할 INDEX, 대체할 COUNTER, 추가할 PROPERTIES

const numbers1_0 = [0, 1, 2, 3, 4, 5];
const addTen1_0 = numbers1_0.splice(0, 0, 10);
console.log(addTen1_0);
console.log(numbers1_0);
console.log("........................");

const numbers1_1 = [0, 1, 2, 3, 4, 5];
const addTen1_1 = numbers1_1.splice(0, 0, 10, 10);
console.log(addTen1_1);
console.log(numbers1_1);
console.log("........................");

// 아래는 0번 인덱스부터 2개의 요소를 삭제하고, 10을 두개 추가한다.
const numbers1_2 = [0, 1, 2, 3, 4, 5];
const addTen1_2 = numbers1_2.splice(0, 2, 10, 10);
console.log(addTen1_2);
console.log(numbers1_2);
console.log("........................");

// 03. 요소 대체하기(REPLACE)
// 아래 연습문제는 INDEX를 지정하고, 변경할 PROPERTY를 지정하여 number 배열에서 한개의 숫자를 대체한다.
// splice 대체할 INDEX, 대체할 COUNTER, 대체할 PROPERTIES

const numbers2_0 = [0, 1, 2, 3, 4, 5];
const replaceTen2_0 = numbers2_0.splice(0, 1, 10);
console.log(replaceTen2_0);
console.log(numbers2_0);
console.log("........................");

const numbers2_1 = [0, 1, 2, 3, 4, 5];
const replaceTen2_1 = numbers2_1.splice(1, 1, 10);
console.log(replaceTen2_1);
console.log(numbers2_1);
console.log("........................");

const numbers2_2 = [0, 1, 2, 3, 4, 5];
const replaceTen2_2 = numbers2_2.splice(2, 1, 10);
console.log(replaceTen2_2);
console.log(numbers2_2);
console.log("........................");

// 03. 음수 인덱스
// 아래 연습문제는 음수 INDEX를 지정하고, 변경할 PROPERTY를 지정하여 배열을 변경한다.
// 03-1. 음수 인덱스를 사용하여 삭제하기.
const numbers3_0 = [0, 1, 2, 3, 4, 5];
const minuesIndexDelete0_1 = numbers3_0.splice(-1, 1);
console.log(minuesIndexDelete0_1);
console.log(numbers3_0);

const numbers3_1 = [0, 1, 2, 3, 4, 5];
const minuesIndexDelete0_2 = numbers3_1.splice(-2, 1);
console.log(minuesIndexDelete0_2);
console.log(numbers3_1);

const numbers3_2 = [0, 1, 2, 3, 4, 5];
const minuesIndexDelete0_3 = numbers3_2.splice(-3, 1);
console.log(minuesIndexDelete0_3);
console.log(numbers3_2);

//03-2. 음수 인덱스를 사용하여 추가하기.
const numbers3_3 = [0, 1, 2, 3, 4, 5];
const minuesIndexAdd0_0 = numbers3_3.splice(-1, 0, 10);
console.log(minuesIndexAdd0_0);
console.log(numbers3_3);

const numbers3_4 = [0, 1, 2, 3, 4, 5];
const minuesIndexAdd0_1 = numbers3_4.splice(-2, 0, 10);
console.log(minuesIndexAdd0_1);
console.log(numbers3_4);

const numbers3_5 = [0, 1, 2, 3, 4, 5];
const minuesIndexAdd0_2 = numbers3_5.splice(-3, 0, 10);
console.log(minuesIndexAdd0_2);
console.log(numbers3_5);

//03-3. 음수 인덱스를 사용하여 대체하기.
const numbers3_6 = [0, 1, 2, 3, 4, 5];
const minuesIndexReplcae0_0 = numbers3_6.splice(-1, 1, 10);
console.log(minuesIndexReplcae0_0);
console.log(numbers3_6);

const numbers3_7 = [0, 1, 2, 3, 4, 5];
const minuesIndexReplcae0_1 = numbers3_7.splice(-2, 1, 10);
console.log(minuesIndexReplcae0_1);
console.log(numbers3_7);

const numbers3_8 = [0, 1, 2, 3, 4, 5];
const minuesIndexReplcae0_2 = numbers3_8.splice(-3, 1, 10);
console.log(minuesIndexReplcae0_2);
console.log(numbers3_8);
