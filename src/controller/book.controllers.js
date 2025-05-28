import bookServices from "../service/book.services.js"

async function createBookController(req, res)   {
    const newBook = req.body
    const userId = req.userId

    try {
        const createdBook = await bookServices.createBookService(newBook, userId)
        res.status(201).send(createdBook)
    } catch (error) {
        res.status(400).send(error.message)
    }
    
}

async function findAllBooksController(req, res) {
    try {
        const books = await bookServices.findAllBooksService()
        res.status(200).send({books})
    } catch (error) {
        res.status(400).send(error.message)
    }
}

async function findBookByIdController(req, res) {
    const {id} = req.params
    try {
        const book = await bookServices.findBookByIdService(id)
        res.status(200).send({book})
    } catch (error) {
        res.status(404).send(error.message)
    }
    
}

async function deleteBookService(req, res) {
    const {id} = req.params
    try {
        const message = await bookServices.deleteBookService(id)
        res.send({message})
    } catch (error) {
        res.status(400).send(error.message)
    }
}

async function updateBookController(req, res) {
    const {id} = req.params
    const newBook = req.body
    try {
        const book = await bookServices.updateBookService(id,newBook)
        res.status(201).send({book})
    } catch (err) {
        res.status(400).send(err.message)
    }
    
}

export default {
    createBookController,
    findAllBooksController,
    findBookByIdController,
    deleteBookService,
    updateBookController
}