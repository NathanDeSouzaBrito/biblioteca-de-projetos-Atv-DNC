import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

function sendEmail(email, bookTitle, dueDate) {
    const mailOptions = {
        from: process.env.EMAIL_USER || "no-reply@library.local",
        to: email,
        subject: "Lembrete: devolução de livro",
        text: `Olá. Lembrete: o livro '${bookTitle}' deve ser devolvido até ${dueDate}.`,
        html: `
        <div style="font-family: Arial, Helvetica, sans-serif; background:#f4f6f8; padding:20px;">
            <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
                <div style="background:linear-gradient(90deg,#6c63ff,#00b4d8);padding:18px 24px;color:#fff;">
                    <h2 style="margin:0;font-size:20px;">Lembrete de devolução</h2>
                </div>
                <div style="padding:20px 24px;color:#333;line-height:1.5;font-size:14px;">
                    <p style="margin:0 0 12px;">Olá,</p>
                    <p style="margin:0 0 12px;">Este é um lembrete de que o livro <strong style="color:#111;">${bookTitle}</strong> deve ser devolvido até <strong style="color:#111;">${dueDate}</strong>.</p>
                    <p style="margin:0 0 18px;">Por favor, certifique-se de devolvê-lo a tempo para evitar multas.</p>
                    <p style="margin:0 0 18px;"><a href="#" style="display:inline-block;padding:10px 16px;background:#6c63ff;color:#fff;border-radius:6px;text-decoration:none;">Ver empréstimos</a></p>
                    <hr style="border:none;border-top:1px solid #eef0f2;margin:12px 0;" />
                    <p style="margin:0;font-size:12px;color:#778087;">Se você não reconhece esta notificação, ignore-a.</p>
                </div>
                <div style="background:#fafafa;padding:12px 24px;font-size:12px;color:#9aa3a9;text-align:center;">Biblioteca Comunitária • Obrigado por usar nossos serviços</div>
            </div>
        </div>
        `
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Erro ao enviar email:", err);
        } else {
            console.log("Email enviado:", info.response);
        }
    });
}


export default sendEmail;
