// map
const numbers = [1, 2, 3, 4, 5];

// 각 숫자를 두 배로 만드는 함수
const doubledNumbers = numbers.map(function(number) {
    return number * 2;
});

console.log(doubledNumbers); // [2, 4, 6, 8, 10]

// 문자열 배열에서 각 문자열의 길이를 반환하는 새로운 배열 만들기

const strings = ["apple", "banana", "cherry"];

// 각 문자열의 길이를 반환하는 함수
const lengths = strings.map(function(str) {
    return str.length;
});

console.log(lengths); // [5, 6, 6]

const numbers = [1, 2, 3, 4, 5];

// 각 숫자의 제곱을 반환하는 함수
const squares = numbers.map(function(number) {
    return number * number;
});

console.log(squares); // [1, 4, 9, 16, 25]

const objects = [
    { id: 1, name: "apple" },
    { id: 2, name: "banana" },
    { id: 3, name: "cherry" }
];

// 각 객체의 name 속성만을 포함하는 새로운 배열 생성
const names = objects.map(function(obj) {
    return obj.name;
});

console.log(names); // ["apple", "banana", "cherry"]

// filter 연습
const numbers = [1, 2, 3, 4, 5];

// 짝수만을 필터링하는 함수
const evenNumbers = numbers.filter(function(number) {
    return number % 2 === 0;
});

console.log(evenNumbers); // [2, 4]

// 문자열 배열에서 길이가 5 이상인 문자열만 골라내기
const strings = ["apple", "banana", "cherry", "orange", "grape"];

// 길이가 5 이상인 문자열만을 필터링하는 함수
const longStrings = strings.filter(function(str) {
    return str.length >= 5;
});

console.log(longStrings); // ["banana", "cherry", "orange"]

//숫자 배열에서 5 이상인 숫자만 필터링하는 함수
const numbers = [1, 6, 3, 8, 2, 7, 4];

// 5보다 큰 숫자만을 필터링하는 함수
const greaterThanFive = numbers.filter(function(number) {
    return number > 5;
});

console.log(greaterThanFive); // [6, 8, 7]

//객체 배열에서 나이가 25 이상인 객체만 골라내는 코드
const people = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 35 },
    { name: 'Charlie', age: 30 },
    { name: 'David', age: 40 }
];

// 나이가 25 이상인 객체만을 필터링하는 함수
const overTwentyFive = people.filter(function(person) {
    return person.age >= 25;
});

console.log(overTwentyFive); // [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 35 }, { name: 'Charlie', age: 30 }, { name: 'David', age: 40 }]

//Spread concat() 메서드를 사용하는 예제
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

// concat() 메서드를 사용하여 두 배열을 합치기
const combinedArray = array1.concat(array2);

console.log(combinedArray); // [1, 2, 3, 4, 5, 6]

//두 문자열 배열을 하나의 배열로 합치기
const originalObject = {
    name: 'Alice',
    age: 30
};

// 기존 객체를 복사하여 새로운 객체를 만들고, 새로운 속성을 추가
const newObject = {
    ...originalObject,
    city: 'New York'
};

console.log(newObject); // { name: 'Alice', age: 30, city: 'New York' }

//두 객체를 합쳐서 하나의 객체로 만들기
const object1 = {
    name: 'Alice',
    age: 30
};

const object2 = {
    city: 'New York',
    country: 'USA'
};

// 두 객체를 합쳐서 하나의 객체로 만들기
const combinedObject = {
    ...object1,
    ...object2
};

console.log(combinedObject); 
// { name: 'Alice', age: 30, city: 'New York', country: 'USA' }

//비구조화 할당 코드

// 객체 비구조화 할당
const person = { name: 'Alice', age: 30, city: 'New York' };
const { name, age, city } = person;

console.log(name); // 'Alice'
console.log(age); // 30
console.log(city); // 'New York'

// 배열 비구조화 할당
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;

console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

// 배열의 스프레드 연산자 사용
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const combinedArray = [...array1, ...array2];

console.log(combinedArray); // [1, 2, 3, 4, 5, 6]

// 객체의 스프레드 연산자 사용
const object1 = { a: 1, b: 2 };
const object2 = { c: 3, d: 4 };
const combinedObject = { ...object1, ...object2 };

console.log(combinedObject); // { a: 1, b: 2, c: 3, d: 4 }

// 삼항 연산자
// 숫자가 짝수인지 홀수인지 판별하는 삼항 연산자 사용
const number = 7;
const isEven = number % 2 === 0 ? '짝수' : '홀수';

console.log(`${number}는 ${isEven}입니다.`);

// 점수에 따라 학점을 결정하는 삼항 연산자 사용
const score = 85;
const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'F';

console.log(`점수 ${score}의 학점은 ${grade}입니다.`);


