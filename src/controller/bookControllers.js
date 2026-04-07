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

async function findBookByIdController(req, res) {
    const bookId = req.params.id;

    try {
        const book = await bookService.findBookByIdService(bookId);
        res.status(200).send(book);
    } catch (err) {
        res.status(404).send({ error: err.message });
    }
}

async function updateBookController(req, res) {
    const bookId = req.params.id;
    const updatedBook = req.body;
    const userId = req.userId;

    try {
        const response = await bookService.updateBookService(updatedBook, bookId, userId);
        res.status(200).send(response);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

async function deleteBookController(req, res) {
    const bookId = req.params.id;
    const userId = req.userId;

    try {
        const response = await bookService.deleteBookService(bookId, userId);
        res.status(200).send(response);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

async function searchBooksController(req, res) {
    const search = req.query.search;

    try {
        const books = await bookService.searchBooksService(search);
        res.status(200).send(books);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

export default {
    createBookController,
    findAllBooksController,
    findBookByIdController,
    updateBookController,
    deleteBookController,
    searchBooksController
}