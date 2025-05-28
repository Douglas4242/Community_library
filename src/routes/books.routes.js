import { Router } from "express";
import bookControllers from "../controller/book.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate, validateBookId } from "../middlewares/validation.middlewares.js";
import { bookSchema } from "../schema/book.schema.js";

const router = Router()

router.get("/books", bookControllers.findAllBooksController)

router.use(authMiddleware)
router.post("/books", validate(bookSchema), bookControllers.createBookController)
router.get('/books/:id',validateBookId , bookControllers.findBookByIdController)
router.delete('/books/:id',validateBookId , bookControllers.deleteBookService)
router.patch('/books/:id', validateBookId, bookControllers.updateBookController)


export default router