import { Router } from "express";
import bookControllers from "../controller/book.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middlewares.js";
import { bookSchema } from "../schema/book.schema.js";

const router = Router()

router.get("/books", bookControllers.findAllBooksController)

router.use(authMiddleware)
router.post("/books", validate(bookSchema), bookControllers.createBookController)


export default router