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

async function deleteBookService(id, userId) {
    const book = await bookRepositories.findBookByIdRepository(id)
    if (!book) throw new Error ("Book not found")
    if (book.userId !== userId) throw new Error("Unauthorized")
    const {message} = await bookRepositories.deleteBookRepository(id)
    return message 
}

async function updateBookService(id, book, userId) {
    const newBook = await bookRepositories.findBookByIdRepository(id)
    if(!newBook) throw new Error ("Book was not found")
    if (newBook.userId !== userId) throw new Error("Unauthorized")
    const updatedBook = await bookRepositories.updateBookRepository(id, book)  
    return updatedBook
}

export default {
    createBookService,
    findAllBooksService,
    findBookByIdService,
    deleteBookService,
    updateBookService
}