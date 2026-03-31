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
    return new Promise((res, rej) => {
        const { username, email, password, avatar } = newUser;

        db.run(`
            INSERT INTO users (username, email, password, avatar)
            VALUES (?, ?, ?, ?)
        `, [username, email, password, avatar], 
        (err) => {
            if (err) {
                rej(err);
            } else {
                res(
                    { 
                        user: { id: this.lastID, ...newUser } 
                    }
                );
            }
        });
    });
}

function getUsersRepository() {
    return new Promise((res, rej) => {
        db.all(`
            SELECT id, username, email, password, avatar
            FROM users
        `, [], (err, rows) => {
            if (err) {
                rej(err);
            } else {
                res(rows);
            }
        });
    });
}

export default { createUserRepository, getUsersRepository };