import loanService from "../service/loanService.js";

async function createLoanController(req, res) {
    const { bookId, dueDate } = req.body;
    const userId = req.user.id;

    try {
        const createdLoan = await loanService.createLoanService(userId, bookId, dueDate);
        res.status(201).send(createdLoan);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

async function findAllLoansController(req, res) {
    try {
        const loans = await loanService.findAllLoansService();
        res.status(200).send(loans);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

async function findLoanByIdController(req, res) {
    const  loanId  = req.params.id;

    try {
        const loan = await loanService.findLoanByIdService(loanId);
        res.status(200).send(loan);
    } catch (err) {
        res.status(404).send({ error: err.message });
    }
}

async function deleteLoanController(req, res) {
    const loanId = req.params.id;
    const userId = req.user.id;

    try {
        const response = await loanService.deleteLoanService(loanId);
        res.status(200).send(response);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

export default {
    createLoanController,
    findAllLoansController,
    findLoanByIdController,
    deleteLoanController
}