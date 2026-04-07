import loanRepositories from "../repositories/loanRepositories.js";

async function createLoanService(userId, bookId, dueDate) {
    const createdLoan = await loanRepositories.createLoanRepository(userId, bookId, dueDate);
    if (!createdLoan) throw new Error("Failed to create loan");
    return createdLoan;
}

async function findAllLoansService() {
    const loans = await loanRepositories.findAllLoansRepository();
    return loans;
}

async function findLoanByIdService(loanId) {
    const loan = await loanRepositories.findLoanByIdRepository(loanId);
    if (!loan) throw new Error("Loan not found");
    return loan;
}

async function deleteLoanService(loanId) {
    const loan = await loanRepositories.deleteLoanRepository(loanId);
    if (!loan) throw new Error("Failed to delete loan");
    if (loan.userId !== userId) throw new Error("Unauthorized");
    const response = await loanRepositories.findLoanByIdRepository(loanId);
    return response;
}

export default {
    createLoanService,
    findAllLoansService,
    findLoanByIdService,
    deleteLoanService
}