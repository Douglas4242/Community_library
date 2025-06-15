import { Router } from "express";
import bookControllers from "../controller/book.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate, validateBookId } from "../middlewares/validation.middlewares.js";
import { bookSchema } from "../schema/book.schema.js";

const router = Router()

router.get("/", bookControllers.findAllBooksController)

router.use(authMiddleware)
router.post(";", validate(bookSchema), bookControllers.createBookController)
router.get('/search', bookControllers.searchBookController)
router.get('/:id',validateBookId , bookControllers.findBookByIdController)
router.delete('/:id',validateBookId , bookControllers.deleteBookService)
router.patch('/:id', validateBookId, bookControllers.updateBookController)


export default router