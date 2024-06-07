// SPLICE 함수

// Splice 메소드는 원본 배열의 데이터를 직접 수정하고, 이를 반환하는 메소드다.
// splice(삭제할 INDEX, 삭제할 COUNTER)

const numbers0 = [0, 1, 2, 3, 4, 5];
const deleteZero = numbers0.splice(0, 1);
console.log(deleteZero);
console.log(numbers0);
console.log("........................");

const numbers1 = [0, 1, 2, 3, 4, 5];
const deleteOne = numbers1.splice(1, 1);
console.log(deleteOne);
console.log(numbers1);
console.log("........................");

const numbers2 = [0, 1, 2, 3, 4, 5];
const deleteTwo = numbers2.splice(2, 1);
console.log(deleteTwo);
console.log(numbers2);
console.log("........................");

const numbers3 = [0, 1, 2, 3, 4, 5];
const deleteTree = numbers3.splice(3, 1);
console.log(deleteTree);
console.log(numbers3);
console.log("........................");

const numbers4 = [0, 1, 2, 3, 4, 5];
const deleteFour = numbers4.splice(4, 1);
console.log(deleteFour);
console.log(numbers4);
console.log("........................");

const numbers5 = [0, 1, 2, 3, 4, 5];
const deleteFive = numbers5.splice(5, 1);
console.log(deleteFive);
console.log(numbers5);
console.log("........................");
