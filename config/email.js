const nodemailer = require('nodemailer')
const dotenv = require('dotenv');

dotenv.config({path: './.env'})

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    }
});

async function mailSend(req, res, next){
    const mailSent = await transporter.sendMail({
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: req.body.subject,
        text:   'Nome: ' + req.body.name + '\n' + 
                'Telefone: ' + req.body.phone + '\n' +
                'E-mail: ' + req.body.email + '\n' +
                'Assunto: ' + req.body.subject + '\n' +
                'Mensagem: '+ req.body.message
    });

    const mailCustomerSent = await transporter.sendMail({
        from: process.env.EMAIL,
        to: req.body.email,
        subject: 'Cruz Distribuidora',
        text:   'Olá ' + req.body.name + '\n\n' + 
                'Recebemos sua mensagem e em breve entraremos em contato' + '\n\n' + 
                'Equipe Cruz Distribuidora'
    });

    next();
};

module.exports = mailSend;