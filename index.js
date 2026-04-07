import express from "express";
import getUsers from "./users/usersGet.js";
import postUsers from "./users/usersPost.js";
import userRouters from "./src/routes/userRoutes.js";
import bookRouters from "./src/routes/bookRoutes.js";
const app = express();

const port = 3000;


app.use(express.json());
app.use(userRouters);
app.use(bookRouters);
// metodos de API
//Metodo => GET, POST, PUT/PATCH, DELETE
//NOME => Sempre no plural, ex: /users, /products
//Callback function => Onde executamos o backend(logica, regra de negocio)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});