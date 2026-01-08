import nodemailer from "nodemailer";

import "dotenv/config";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.FOREVER_MAILER_USER,
        pass: process.env.FOREVER_MAILER_PASS,
    },
});


const sendMail = async (to: string, subject: string,html:string) => {
    const mailOptions = {
        from: process.env.FOREVER_MAILER_USER,
        to,
        subject,
        html,
    };
    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log("Send mail error: ",error);
        return false;
    }
};
export { transporter, sendMail };
