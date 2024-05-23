const express = require('express')
const cors =  require('cors')

const post = 3000
const app = express();

app.use(cors())

app.get('/', (req, res) => {
    res.send("hello world")
});

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})


