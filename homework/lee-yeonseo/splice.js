// splice 메서드 실습

const objArr = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' },
];

//1 세번째 객체 삭제
const objArr1 = [...objArr].splice(2, 1);
console.log('1번', objArr1);

//2 새로운 객체 추가
const objArr2 = [...objArr].splice(1, 0, { id: 5, name: 'Eve' });
console.log('2번', objArr2);

//3 요소 교체
const objArr3 = [...objArr].splice(0, 1, { id: 6, name: 'Frank' });
console.log('3번', objArr3);

//4 객체 여러개 삭제
const objArr4 = [...objArr].splice(1, 2);
console.log('4번', objArr4);

//5 모든 객체 삭제
const objArr5 = [...objArr].splice(0);
console.log('5번', objArr5);

//6 마지막 객체 삭제
const objArr6 = [...objArr].splice(objArr.length - 1, 1);
console.log('6번', objArr6);

//7 첫번째 위치에 객체 추가
const objArr7 = [...objArr].splice(0, 0, { id: 7, name: 'Jack' });
console.log('7번', objArr7);

//8 객체 여러개 삭제 후 객체 한 개 추가
const objArr8 = [...objArr].splice(1, 3, { id: 8, name: 'Kara' });
console.log('8번', objArr8);

//9 매개변수로 받은 아이디와 일치하는 객체를 찾아서 수정하기
function splicePrac(id) {
  const item = objArr.find((obj) => obj.id === id);
  const itemIndex = objArr.indexOf(item);
  const newObjArr = [...objArr];
  newObjArr.splice(itemIndex, 1, { ...item, name: '되나??' });
  return newObjArr;
}
console.log('9번', splicePrac(1));
