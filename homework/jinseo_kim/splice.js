// SPLICE 함수

// Splice 메소드는 원본 배열의 데이터를 직접 수정하고, 이를 반환하는 메소드다.
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

// Splice 메소드는 원본 배열의 데이터를 직접 수정하고, 이를 반환하는 메소드다.
// splice 추가할 INDEX, 추가할 PROPERTIES

// 아래는 0번 인덱스부터 0개의 요소를 삭제하고, 10을 추가한다.
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
