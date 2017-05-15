const express = require("express")
const app = express()
const path = require("path")

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../dist')))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(3000, () => {
    console.log("Listening on port 3000!")
})