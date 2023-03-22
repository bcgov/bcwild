const nodemailer = require("nodemailer");
const { InternalServerError } = require("../errorHandler/customErrorHandlers");

require("dotenv").config();
var transporter = nodemailer.createTransport({
    host: "smtp.fatcow.com",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.EMAIL_PASS}`,
    },
    tls: { rejectUnauthorized: false },
});

const registerMail = (email,name) => {
    let mailoptionsuccess = {
        from: {
            name: "WildLife",
            address: process.env.EMAIL
        },
        to: email,
        subject: "Registration successful",
        html: `<p>Hi ${name},</p>
        <p>You have been successfully registered on WildLife</p>`
    };

    const mailsend = transporter
        .sendMail(mailoptionsuccess)
        .then((info) => {
            return info;
        })
        .catch((err) => {
            throw new InternalServerError(
                "Email cannot send, please try again in some time"
            );
        });

    return mailsend;
};

const signupApprovalMail = (email,name,status) => {
    let mailoptionsuccess = {
        from: {
            name: "WildLife",
            address: process.env.EMAIL
        },
        to: email,
        subject: "Sigup Access Status",
        html: `<p>Hi ${name},</p>
        <p>This mail is to inform you that your signup access status is ${status}</p>`
    };

    const mailsend = transporter
        .sendMail(mailoptionsuccess)
        .then((info) => {
            return info;
        })
        .catch((err) => {
            throw new InternalServerError(
                "Email cannot send, please try again in some time"
            );
        });

    return mailsend;
};

//reset password mail
const resetMail = (email,name,resetKey) => {
    let mailoptionsuccess = {
        from: {
            name: "WildLife",
            address: process.env.EMAIL
        },
        to: email,
        subject: "Reset password",
        html: `<p>Hi ${name},</p>
        <p>
        To Reset Password   <a href="${process.env.RESET_PASSWORD_URL}/${resetKey}">click here</a>
        </p>        
        <p>If you did not request this email you can safely ignore it.</p>`
    };

    const mailsend = transporter
        .sendMail(mailoptionsuccess)
        .then((info) => {
            return info;
        })
        .catch((err) => {
            throw new InternalServerError(
                "Email cannot send, please try again in some time"
            );
        });

    return mailsend;
};

module.exports = {
    registerMail,
    signupApprovalMail,
    resetMail
}