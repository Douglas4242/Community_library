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

export default {
    createBookService,
    findAllBooksService
}