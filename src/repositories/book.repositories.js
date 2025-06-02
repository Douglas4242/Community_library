import db from "../config/database.js"

db.run(`
    CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    userId INTEGER,
    FOREIGN KEY (userId) REFERENCES users(id)
    )
    `)

function createBookRepository(newBook, userId) {
    return new Promise((resolve, reject) => {
        const {title, author} = newBook
        db.run(`
            INSERT INTO books (title, author, userId)
            VALUES (?, ?, ?)
            `, [title, author, userId], function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve({id: this.lastID, ...newBook})
                }
            })
    })
}

function findAllBooksRepository() {
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT * FROM books
            `,
        [], 
        (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

function findBookByIdRepository(id) {
    return new Promise((resolve, reject) => {
        db.get(`
            SELECT id, title, author, userId FROM books
            WHERE id = ?
            `, [id],
        (err, row) => {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
}

function deleteBookRepository(id) {
    return new Promise((resolve, reject) => {
        db.run(`
            DELETE FROM books
            WHERE id = ?
            `, [id],
        (err) => {
            if (err) {
                reject(err)
            } else {
                resolve({message: `Book deleted successfully: ${id}`})
            }
        })
    })
}

function updateBookRepository(id, book) {
    return new Promise ((resolve, reject) => {
        const {title, author} = book
        const fields = ['title', 'author'];
        let query = "UPDATE books SET"
        const values = []

        fields.forEach((field) => {
             if(book[field] !== undefined) {
                query += ` ${field} = ?,`
                values.push(book[field])
            }
        })

        query = query.slice(0, -1)

        query += " WHERE id = ?"
        values.push(id)
        db.run(query, values, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve({...book, id})
            }
        })
    })

}

function searchBookRepository(search) {
    return new Promise ((resolve, reject) => {
        db.all(`
            SELECT * FROM books
            WHERE title LIKE ? OR author LIKE ?
            `, [`%${search}%`,`%${search}%`],
            (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
    })
}


export default {
    createBookRepository,
    findAllBooksRepository,
    findBookByIdRepository,
    deleteBookRepository,
    updateBookRepository, 
    searchBookRepository
}