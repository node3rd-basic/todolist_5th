// map

const colors = ["빨강", "파랑", "노랑", "초록", "보라", "주황"];


const colors_cloth = colors.map((color => color === "빨강" ? color + "옷감" : color + "공"))

console.log(colors_cloth);

// filter

const basic_colors = colors_cloth.filter(color => {
    if(color.includes("옷감")) {
        return true
    }else{
        return false
    }
})

console.log(basic_colors);

// Spread

const copiedColors = [...colors];
console.log(copiedColors);
