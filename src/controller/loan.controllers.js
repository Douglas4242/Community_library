import loanServices from "../service/loan.services.js";

async function createLoanController(req, res) {
    const {bookId, dueDate} = req.body 
    const userId = req.userId

    try {
        const createdLoan = await loanServices.createLoanService(userId, bookId, dueDate)
        res.status(201).send({createdLoan})
    } catch (err)  {
        res.status(400).send(err.message)
    }

}

async function findAllLoansController (req, res) {
    try {
        const loans = await loanServices.findAllLoansService()
        res.status(200).send({loans})
    } catch (err) {
        res.status(404).send(err.message)
    }
}

export default {
    createLoanController,
    findAllLoansController
}