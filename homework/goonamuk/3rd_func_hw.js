// 함수 연습

const funcPrac1st = function (num) {
  const funcPrac2nd = function () {
    const funcPrac3rd = () => num * 12;
    /* 
    화살표 함수의 작동을 확인하기 위해 중괄호와 리턴 지워보기
    {
        return num * 12;
    };
    */
    return funcPrac3rd() / 2;
  };
  return funcPrac2nd() + 1;
};

let num = 7;

console.log(funcPrac1st(num));

//배열 연습

const snack = [`고래밥`, `상어밥`, `자갈치`, `오징어집`, `문어집`];
const findSnack = snack.find((item) => item === `오징어집`);
console.log(`${findSnack}은 ${snack.indexOf(findSnack)}번 매대에 있습니다.`);
