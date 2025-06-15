import{ Router } from "express"
import userRouters from './user.routes.js'
import booksRouters from './books.routes.js'
import loanRouter from './loan.router.js'

const routers = Router() 

routers.use("/users", userRouters)
routers.use("/books",booksRouters)
routers.use("/loans",loanRouter)

export {routers}