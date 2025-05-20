import express from "express"
const app = express()

app.use(express.json())

const users = []

app.get("/users", (req,res) => {
    res.send({users})
})

app.post("/users", function (req, res) {
    const body = req.body
    users.push(body)
    res.status(201).send()
})

app.listen(3000, () => console.log("Server running on port 3000"))