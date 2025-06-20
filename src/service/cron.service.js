import cron from "node-cron";
import loanRepository from "../repositories/loan.repositories.js"
import userRepository from "../repositories/user.repositories.js"
import bookRepository from "../repositories/book.repositories.js"
import moment from "moment";
import sendEmail from "./email.service.js";

cron.schedule('06 * * * *', async () => {
    console.log("Running daily job to check for due dates...")
    const loans = await loanRepository.findAllLoansRepository()
    const today = moment().startOf('day')

    loans.forEach(async (loan)  => {
        const dueDate = moment(loan.dueDate).startOf('day')
        const reminderDueDate = moment(dueDate).subtract(1, 'days')


        if (today.isSame(reminderDueDate)) {
            sendEmail(loan.username, loan.email, loan.title, loan.dueDate)
        }
    })
})