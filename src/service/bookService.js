import e from "express";
import bookRepositories from "../repositories/bookRepositories.js";

async function createBookService(newBook, userId) {
    const createdBook = await bookRepositories.createBookRepository(newBook, userId);
    if (!createdBook) {
        throw new Error("Failed to create book");
    };
    return createdBook;
}

async function findAllBooksService() {
    const books = await bookRepositories.findBooksRepository();
    return books;
}

export default {
    createBookService,
    findAllBooksService
}