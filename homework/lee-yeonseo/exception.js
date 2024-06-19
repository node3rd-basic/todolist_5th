// 아무것도 없는 상테에서 에러 날려보기
try {
    throw new Error('try catch 연습111')
} catch (error) {
    console.log('ERROR111',error.message)
}

// 계산 다 하고 에러 날려보기
try {
    const a = 10
    const b = 20
    console.log('try catch 연습222',a+b)
    throw new Error("try catch 연습222")
} catch (error) {
    console.log('ERROR222',error.message)
}

// 콘솔 찍기 전에 에러 날려보기
try {
    const carrot = '당근'
    const swing = ' 흔들기'

    throw new Error("try catch 연습 333")

    console.log('try catch 연습333',carrot+swing)
} catch (error) {
    console.error('ERROR333', error.message)
}

// 정의 되지 않은 변수 사용
try {
    console.log(tryCatch)
} catch (error) {
    console.error('ERROR444', error.message)
}

// 에러 안나는 상태
try {
    const a = '당근'
    const b = ' 흔들기'

    console.log(a+b)
} catch (error) {
    console.error('ERROR555', error.message)
}