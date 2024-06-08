const 지워질_공_id = 10

const 공주머니 = [
    {id: 1, "색상": "빨간색", "크기": "11cm" },
    {id: 2, "색상": "파란색", "크기": "14cm" },
    {id: 3, "색상": "검은색", "크기": "10cm" },
    {id: 4, "색상": "초록색", "크기": "8cm" },
]

const 지워질_공_index = 공주머니.findIndex(공 => 공.id === 지워질_공_id)

if (지워질_공_index === -1) {
    console.log("없는 공입니다.")
} else {
    console.log("지워질_공_index", 지워질_공_index)
    console.log("원본 주머니",  공주머니)
    공주머니.splice(지워질_공_index, 1)
    console.log("검은공 없는 주머니",  공주머니)
}



// -----
const 수정될공_id = 3

const 공주머니2 = [
    {id: 1, "색상": "빨간색", "크기": "11cm" },
    {id: 2, "색상": "파란색", "크기": "14cm" },
    {id: 3, "색상": "검은색", "크기": "10cm" },
    {id: 4, "색상": "초록색", "크기": "8cm" },
]
const 수정될_공 = 공주머니2.find(공 => 공.id === 수정될공_id)
if (!수정될_공) {
    throw new Error("없는 공입니다.")
}

const 수정될_공_index = 공주머니2.indexOf(수정될_공)
console.log("지워질_공_index", 수정될_공_index)
console.log("원본 주머니2",  공주머니2)
const 수정된공_주머니=  공주머니2.splice(
    수정될_공_index,
    1,
    {
        ...수정될_공,
        색상: "노란색"
    }
)
console.log("변경된  주머니",  공주머니2)
console.log("수정된공_주머니", 수정된공_주머니)



const testArr = [1,2,3,4,5]
function arrayModify(number) {
    testArr.push(number)
    return [number]
}

console.log("testArr", testArr)
const arrayOfAdded = arrayModify(6)
console.log("testArr2", testArr)
console.log("arrayOfAdded", arrayOfAdded)




