try {
    const a = 10;
    const b = 10
    console.log(a + b)
    console.log("error 안남")
    throw new Error("에러 발생")
} catch (e) {
    console.log(0)
}

