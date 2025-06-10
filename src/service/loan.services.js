import loanRepositories from "../repositories/loan.repositories.js";

async function createLoanService (userId, bookId, dueDate) {
    const createdLoan =  await loanRepositories.createLoanRepository(userId, bookId, dueDate)
    if (!createdLoan) throw new Error ("Error creating Loan")
    return createdLoan
}

async function findAllLoansService() {
    const loans = await loanRepositories.findAllLoansRepository()
    return loans
}

async function findLoanByIdService(id) {
    const loan = await loanRepositories.findLoanByIdRepository(id)
    if (!loan) throw new Error ("Loan not found")
    return loan
    
}

async function deleteLoanService(id, userId) {
    const loan = await loanRepositories.findLoanByIdRepository(id)
    if (!loan) throw new Error ("Loan not found")
    if (loan.userId !== userId) throw new Error ("Unauthorized")
    const message = await loanRepositories.deleteLoanRepository(id)
    return (message)
    
}

export default {
    createLoanService,
    findAllLoansService,
    findLoanByIdService,
    deleteLoanService
}