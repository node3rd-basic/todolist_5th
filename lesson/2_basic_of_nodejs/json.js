const json1 = `
    {
        "name": "woojunho",
        birth: "11-1"
    }
`

const obj1 = {
    "name": "woojunho",
    "birth": "11-1"
}

console.log("json1", json1, JSON.parse(json1))
console.log("obj1", obj1, JSON.stringify(obj1))