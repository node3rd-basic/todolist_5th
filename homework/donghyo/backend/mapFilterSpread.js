
// 맵 연습하기
const colors = ["빨강", "파랑", "노랑", "초록", "검정"];

const colors_bedcover = colors.map((colors => colors + "침대커버"))

console.log(colors_bedcover);

// 필터 연습하기
const basic_colors = colors_bedcover.filter(color => {
    if(color.includes("침대커버")) {
        return true
    }else{
        return false
    }
})

console.log(colors_bedcover);

// 스프레드
const copyColors = [...colors];
console.log(copyColors);