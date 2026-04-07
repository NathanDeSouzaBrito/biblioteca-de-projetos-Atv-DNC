import e from "express";
import bookService from "../service/bookService.js";

async function createBookController(req, res) {
    const newBook = req.body;
    const userId = req.userId;

    try {
        const createdBook = await bookService.createBookService(newBook, userId);
        res.status(201).send(createdBook);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

async function findAllBooksController(req, res) {
    try {
        const books = await bookService.findAllBooksService();
        res.status(200).send(books);
    } catch (err) {
        res.status(404).send({ error: err.message });
    }
}

export default {
    createBookController,
    findAllBooksController
}