import express from "express";
import getUsers from "./users/usersGet.js";
import postUsers from "./users/usersPost.js";
const app = express();

const port = 4000;
const users = []


app.use(express.json());

// metodos de API
//Metodo => GET, POST, PUT/PATCH, DELETE
//NOME => Sempre no plural, ex: /users, /products
//Callback function => Onde executamos o backend(logica, regra de negocio)

postUsers(app, users)

getUsers(app, users);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});