import { promise } from "zod/v4";
import db from "../config/database.js";

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        avatar TEXT
        )
    `)

function createUserRepository(newUser) {
    return new Promise((resolve, reject) => {
        const {username, email, password, avatar} = newUser
        db.run(
            `
                INSERT INTO users (username, email, password, avatar)
                VALUES (?, ?, ?, ?)
            `,
            [username, email, password, avatar],
            (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({id: this.lastID, ...newUser})
                }
            }
        )
    })
}

function findUserByEmailRepository(email) {
    return new Promise((resolve, reject) => {
        db.get(`
              SELECT id, username, email, avatar FROM users 
              WHERE email = ?
            `,
            [email],
            (err, row) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(row)
                }
            })
    })
}

function findUserByUsernameRepository(username) {
    return new Promise((resolve, reject) => {
        db.get(`
            SELECT id, username, email, avatar FROM users
            WHERE username = ?
            `,
        [username],
    (err, row) => {
        if (err) {
            reject(err)
        } else {
            resolve(row)
        }
    })
    })
}


function findUserByIdRepository(id) {
    return new Promise((resolve, reject) => {
        db.get(`
            SELECT id, username, email, avatar FROM users
            WHERE id = ?
            `,
        [id],
    (err, row) => {
        if (err) {
            reject(err)
        } else {
            resolve(row)
        }
    })
    })
}

function findAllUsersRepository() {
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT id, username, email, avatar FROM users
            `, [], (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            } )
    }) 
}

export default {
    createUserRepository,
    findUserByEmailRepository,
    findUserByUsernameRepository,
    findUserByIdRepository,
    findAllUsersRepository
    }