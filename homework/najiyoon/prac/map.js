let naji = [
  { a: 1, z: 2, c: 3 },
  { a: 1, z: 3, c: 3 },
  { a: 1, z: 2, c: 3 },
];
// 키 이름 'z'를 'b'로 바꾸기! 모든 요소 다.
// map 활용해서!!
// z = done_at
// b = doneAt
const najiji = naji.map((naji) => ({ ...naji, z: naji.z * 2 }));
console.log(najiji);

const najinaji = naji.map((naji) => ({ a: naji.a, b: naji.z, c: naji.c }));
console.log(najinaji);

const najingjing = naji.map(({ z, ...naji }) => ({ ...naji, b: z }));
console.log(najingjing);
//작성이유 map을 활용하여 done_at 을 doneAt으로 바꾸고 싶어서
