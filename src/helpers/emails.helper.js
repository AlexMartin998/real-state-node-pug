'use strict';

import nodemailer from 'nodemailer';

import {
    EMAIL_HOST,
    EMAIL_PASS,
    EMAIL_PORT,
    EMAIL_USER,
    BACKEND_URL,
} from './../config/index.js';

const setTransport = () =>
    nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    });

export const emailRegister = async emailData => {
    const { name, email, token } = emailData;

    const transport = setTransport();

    // Send mail with defined transport object
    await transport.sendMail({
        from: '"BienesRaices 👻" <hola@bnrs.com>',
        to: email,
        subject: 'Confirma tu cuenta en BienesRaices.com ✔',
        text: 'Comprueba tu cuenta en BienesRaices.com',
        html: `<p>Hola ${name}, comprueba tu cuenta en UpTask</p>
          <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:
            <a href="${BACKEND_URL}/auth/confirm/${token}">Comrpobar cuenta</a>
          </p>
      
          <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje.</p>
        `,
    });
};
