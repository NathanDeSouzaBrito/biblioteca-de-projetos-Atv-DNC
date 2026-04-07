import db from "../config/database.js";

db.run
(`
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        userId INTEGER,
        FOREIGN KEY (userId) REFERENCES users(id)
    )
`);

function createBookRepository(newBook, userId) {
    const { title, author } = newBook;
    return new Promise((res, rej) => {
        db.run(`
            INSERT INTO books (title, author, userId)
            VALUES (?, ?, ?)
        `, [title, author, userId], 
        function (err) {
            if (err) {
                rej(err);
            } else {
                res({ id: this.lastID, title, author, userId });
            }
        });
    });
}

function findBooksRepository() {
    return new Promise((res, rej) => {
        db.all(`
            SELECT * FROM books
        `, [], (err, rows) => {
            if (err) {
                rej(err);
            } else {
                res(rows);
            }
        });
    });
}


export default {
    createBookRepository,
    findBooksRepository
}