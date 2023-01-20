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

export const emailResetPassword = async emailData => {
    const { name, email, token } = emailData;

    const transport = setTransport();

    // Send mail
    await transport.sendMail({
        from: '"BienesRaices 👻" <hola@bnrs.com>',
        to: email,
        subject: 'Reestablece tu Password en BienesRaices.com',
        text: 'Reestablece tu Password',
        html: `<p>Hola ${name}, has solicitado restablecer tu password.</p>
  
        <p>Sigue el siguiente enlace para generar tu nuevo password:
          <a href="${BACKEND_URL}/auth/forgot-password/${token}">Restablecer Password</a>
        </p>
  
        <p>Si tu no solicitaste esto, puedes ignorar este mensaje.</p>
      `,
    });
};
