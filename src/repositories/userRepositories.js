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

const findUserByEmailOrUsername = (email) => {
    return new Promise((res, rej) => {
        db.get(`
                SELECT id, username, email, avatar 
                FROM users
                WHERE email = ?
            `, 
            [email], (err, row) => {
                if (err) {
                    rej(err);
                } else {
                    res(row);
                }
            });
    })
}

const findUserById = (id) => {
    return new Promise((res, rej) => {
        db.get(`
                SELECT id, username, email, avatar 
                FROM users
                WHERE id = ?
            `, 
            [id], (err, row) => {
                if (err) {
                    rej(err);
                } else {
                    res(row);
                }
            });
    })
}

const updateUserRepository = (id, user) => {
    return new Promise((res, rej) => {
        const fields = ["username", "email", "password", "avatar"];
        let query = "UPDATE users SET ";
        const values = [];
        fields.forEach((field) => {
            if (user[field] !== undefined) {
                query += `${field} = ?, `;
                values.push(user[field]);
            }
        });
        query = query.slice(0, -2); // Remove the last comma and space
        query += " WHERE id = ?";
        values.push(id);
        db.run(query, values, (err) => {
            if (err) {
                rej(err);
            } else {
                res({ id, ...user });
            }
        });
    })
}

const findAllUsers = () => {
    return new Promise((res, rej) => {
        db.all(`
                SELECT id, username, email, avatar 
                FROM users
            `, [], (err, rows) => {
                if (err) {
                    rej(err);
                } else {
                    res(rows);
                }
            });
        })
}

const deleteUserRepository = (id) => {
    return new Promise((res, rej) => {
        db.run(`
                DELETE FROM users
                WHERE id = ?
            `, [id], (err) => {
                if (err) {
                    rej(err);
                } else {
                    res({ message: "Usuário deletado com sucesso.", id });
                }
            });
    });
}

export default { 
    createUserRepository, 
    getUsersRepository, 
    findUserByEmailOrUsername, 
    findUserById, 
    findAllUsers, 
    updateUserRepository,
    deleteUserRepository
};