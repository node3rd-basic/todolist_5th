const 지워질공_id= 10
const 공주머니 = [
    { id: 1, "색상": "빨간색", "크기": "11cm" },
    { id: 2, "색상": "파란색", "크기": "14cm" },
    { id: 3, "색상": "검은색", "크기": "10cm" },
    { id: 4, "색상": "초록색", "크기": "18cm" },
]
//특정 하나를 수정 또는 삭제하고 싶을 때 splice 사용
//2번째꺼 부터 1개 삭제 
공주머니.slice(2, 1)
console.log(공주머니)
//splice는 원본 주머니를 바꾸는 것!
//문제: 원하는 인덱스를 매번 지정해줘야함 ; 해결방법
//공의 아이디가 지워질 공의 아이디와 같다면 그 공의 인덱스를 가져오게끔 함
const 지워질공_index = 공주머니.findIndex(공=> 공.id === 지워질공_id)
if (지워질공_index === -1) {
    console.log("없는 공")
} else {
    공주머니.splice(지워질공_index, 1)
}
    //만약 index가 10 등의 배열인덱스 보다 많은 수를 입력 등으로 찾지 못하면 -1임 (false아니구..)
    //배열에서 -1은 뒤에서 첫번째를 의미하므로 맨끝인 초록색이 지워짐
    // 결과가 -1로 나올 경우 아무런 행위를 하지 않도록 지정
    //왜 false로 안나오는 걸까 index = 0부터 시작, false = 0 즉 같음 (타입까지 같은건 아니지만)
   
    // ---------수정----------
    const 수정될공_id= 3
const 공주머니2 = [
    { id: 1, 색상: "빨간색", "크기": "11cm" },
    { id: 2, 색상: "파란색", "크기": "14cm" },
    { id: 3, 색상: "검은색", "크기": "10cm" },
    { id: 4, 색상: "초록색", "크기": "18cm" },
    
]

const 수정될_공 = 공주머니2.find(공 => 공.id === 수정될공_id)
if (!수정될_공) {
    throw new Error("없는 공")
}
const 수정될공_index = 공주머니2.indexOf(수정될_공)
const 수정된_공주머니 = 공주머니2.splice(
    수정될공_index,
    1,
    {...수정될_공, 색상: "무지개색"})
//만약 index, 뒤의 숫자(지워질 갯수의 숫자가) 3이면? 수정될공 index 번호인 파란색부터 3개 지워짐
//=>공주머니2.splice(수정될공_index, 3, { id: 2, "색상": "무지개색", "크기": "20cm" })
//결과는  { id: 1, "색상": "빨간색", "크기": "11cm" }, { id: 2, "색상": "무지개색", "크기": "20cm" }
// ***** splice 는 또하나의 주머니를 만들지 않고 원본 주머니가 바뀌는것 *****
//console.log(공주머니2) 하면 좀 전의 결과인 빨간, 무지개색 이 나옴 
console.log("공주머니2는", 공주머니2)
console.log("수정될_공은", 수정된_공주머니)

const testArr = [1, 2, 3, 4, 5]
function arrayModify(number) {
    testArr.push(number)
    return [number]
}
console.log("testArr", testArr)
const arrayOfAdd = arrayModify(6)
console.log("arrayOfAdd는", arrayOfAdd)
console.log("testArr2는", testArr)