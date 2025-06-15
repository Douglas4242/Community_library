import nodemailer from "nodemailer"
import 'dotenv/config.js'

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
})

function sendEmail (email, bookTittle, dueDate) {
    const mailOptions = {
        from: '',
        to: email,
        subject: 'Reminder: Book due date approchiung',
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: $f60;">Community Library Reminder</h2>
            <p>Dear User,</p>
            <p>This is a reminder that the book <strong>"${bookTittle}"</strong> is due on <strong>${dueDate}</strong>.</p>
            <p>Please make sure to return or renew it on time;</p>
            <p>Best regards,<br>Yor Community Library</p>
        </div>
        `,
    }
    transporter.sendMail(mailOptions,(err, info) => {
        if(err) {
            console.log('Error sending email', err)
        } else {
            console.log('Email sent:', info.response)
        }
    })
    
}


export default sendEmail