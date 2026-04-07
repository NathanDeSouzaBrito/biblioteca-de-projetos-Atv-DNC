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

async function findBookByIdService(bookId) {
    const book = await bookRepositories.findBooksbyIdRepository(bookId);
    if (!book) {
        throw new Error("Book not found");
    }
    return book;
}

async function updateBookService(updatedBook, bookId, userId) {
    const book = await bookRepositories.findBooksbyIdRepository(bookId);
    if (!book) {
        throw new Error("Book not found");
    }
    if (book.userId !== userId) {
        throw new Error("Unauthorized");
    }
    const response = await bookRepositories.updateBookRepository(updatedBook, bookId);
    return response;
}

async function deleteBookService(bookId, userId) {
    const book = await bookRepositories.findBooksbyIdRepository(bookId);
    if (!book) {
        throw new Error("Book not found");
    }
    if (book.userId !== userId) {
        throw new Error("Unauthorized");
    }
    const response = await bookRepositories.deleteBookRepository(bookId);
    return response;
}

async function searchBooksService(search) {
    if (!search) return await bookRepositories.findBooksRepository();
    const books = await bookRepositories.searchBooksRepository(search);
    return books;
}

export default {
    createBookService,
    findAllBooksService,
    findBookByIdService,
    updateBookService,
    deleteBookService,
    searchBooksService
}