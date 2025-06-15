import express from "express"
import userRouters from "./src/routes/user.routes.js"
import booksRouters from "./src/routes/books.routes.js"
import loanRouter from "./src/routes/loan.router.js"
import './src/service/cron.service.js'

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(userRouters)
app.use(booksRouters)
app.use(loanRouter)



app.listen(port, () => console.log("Server running on port", port))