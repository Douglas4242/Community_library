import db from "../config/database.js"

db.run(`
    CREATE TABLE IF NOT EXISTS loans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    bookId INTEGER,
    dueDate DATE,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (bookId) REFERENCES books(id))
    `)

function createLoanRepository (userId, bookId, dueDate) {
    return new Promise ((resolve, reject) => {
        db.run (`
            INSERT INTO loans (userId, bookId, dueDate)
            VALUES (?,?,?)
            `,[userId, bookId, dueDate],
        function (err) {
            if (err) {
                reject(err)
            } else {
                resolve({id: this.lastID, userId, bookId})
            }
        })
    })
}

function findAllLoansRepository () {
    return new Promise ((resolve, reject) => {
        db.all(`
        SELECT * FROM loans
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

function findLoanByIdRepository (id) {
    return new Promise ((resolve, reject) => {
        db.get(`
            SELECT id, bookId, userId, dueDate FROM loans
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

function deleteLoanRepository (id) {
    return new Promise ((resolve, reject) => {
        db.run (`
            DELETE FROM loans
            WHERE id = ?
            `,
            [id],
            (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({message: `loan id: ${id} was deleted successfully`})
                }
            }
        )
    })
}

export default {
    createLoanRepository,
    findAllLoansRepository,
    findLoanByIdRepository,
    deleteLoanRepository
}