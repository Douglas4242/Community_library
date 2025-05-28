import bookRepositories from "../repositories/book.repositories.js";

async function createBookService(newBook, userId) {
    const createdBook = await bookRepositories.createBookRepository(newBook, userId)
    if (!createdBook) throw new Error ('Error creating book')
    return createdBook
}

async function findAllBooksService() {
    const books = await bookRepositories.findAllBooksRepository()
    return books
}

async function findBookByIdService(id) {
    const book = await bookRepositories.findBookByIdRepository(id)
    if (!book) throw new Error ("Book not found")
    return book    
}

async function deleteBookService(id) {
    const book = await bookRepositories.findBookByIdRepository(id)
    if (!book) throw new Error ("Book not found")
    const {message} = await bookRepositories.deleteBookRepository(id)
    return message 
}

export default {
    createBookService,
    findAllBooksService,
    findBookByIdService,
    deleteBookService
}