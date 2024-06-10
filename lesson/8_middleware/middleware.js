const express = require('express')

const app = express()
const port = 3000

app.get("/", (req, res, next) => {
    // error 의도적 발생
    console.log(unknownVariable)
    throw new Error("error 발생")
    console.log("controller")
    res.send("")
})


// req, res, next
// err, req, res, next
app.use((err, req,res, next) => {
    console.log("error 발생시 해당 middleware 실행됨")
    res.status(500).json({
        message: "Internal Server Error",
    })
})

const listeningCallback = () => {
    console.log(`Example app listening on port ${port}`)
}
app.listen(port, listeningCallback)