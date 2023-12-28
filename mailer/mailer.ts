import nodemailer from 'nodemailer';

// CONFIG el transporte de nodemailer para utilizar gmail

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'maatvgun@gmail.com',
    pass: 'gvmjesvfevhsstmo',
    },

    from: 'maatvgun@gmail.com'
});

export const sendEmail = async (to: string, code: string):Promise<void> => {
  try {
       
       const mailOptions = {
              from: '"Maatvgun" "maatvgun@gmail.com"',
                to,
                subject: 'Código de verificación',
                text: `Tu código de verificación es ${code}`
            };

            // Enviamos el email

            await transporter.sendMail(mailOptions);
            console.log('Email enviado');
} catch (error) {
    console.error('Error sending email');
}
}