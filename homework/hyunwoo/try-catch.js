/** try... catch 연습하기 */

// 없는 값 더하기
try {
    const a = 10;
    console.log(a + b);
} catch (error) {
    console.log('에러 발생하면 내가 나온다.');
};
console.log('================================');

// 잘못된 값 입력하기
try {
    const sum = (a, b) => a + b;
    console.log(sum(2,오));
} catch (error) {
    console.log('에러 발생하면 내가 나온다')
};
console.log('================================');

// 강제로 에러 발생시키기
try {
    throw new Error('에러 발생');
} catch (error) {
    console.log('에러 발생하면 내가 나온다.');
};
console.log('================================');

// flase 반환 시 에러 발생시키기
const sum2 = (a, b) => {
    try{
        const result = a + b;
        if (result > 10) {
            return true;
        } else {
            throw new Error('에러 발생');
        }
    } catch (error) {
        console.log('에러 발생하면 내가 나온다')
        return false;
    }
}
console.log(sum2(3,5));
console.log('================================');