import connection from '../database/db.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({ message: 'Todos los campos son requeridos.' });
    }

    try {
         // Eliminar registros expirados en `pending_users`
         await connection.query('DELETE FROM pending_users WHERE created_at < NOW() - INTERVAL 1 HOUR');

        // Verificar si el usuario ya existe en `users`
        const [existingUser] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).send({ message: 'El correo ya está registrado.' });
        }

        // Verificar si el correo ya está en `pending_users`
        const [pendingUser] = await connection.query('SELECT * FROM pending_users WHERE email = ?', [email]);
        if (pendingUser.length > 0) {
            return res.status(409).send({ message: 'Ya se envió un correo de confirmación.' });
        }

        // Generar token de confirmación
        const token = crypto.randomBytes(32).toString('hex');

        // Hashear la contraseña antes de almacenar
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Almacenar en `pending_users`
        await connection.query(
            'INSERT INTO pending_users (name, email, password, token) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, token]
        );

        // Enviar correo con el token
        const confirmationLink = `http://localhost:4000/confirmEmail/${token}`;
        await transporter.sendMail({
            from: 'your_email@gmail.com',
            to: email,
            subject: 'Confirma tu correo electrónico',
            html: `
                <h1>Confirma tu correo electrónico</h1>
                <p>Gracias por registrarte. Por favor, confirma tu correo haciendo clic en el enlace de abajo:</p>
                <a href="${confirmationLink}">Confirmar correo</a>
            `,
        });

        res.status(200).send({ message: 'Correo de confirmación enviado.' });
    } catch (err) {
        console.error('Error en el registro:', err);
        res.status(500).send({ message: 'Error en el servidor.' });
    }
};


export const confirmEmail = async (req, res) => {
    const { token } = req.params;

    try {
        // Buscar usuario pendiente por token
        const [pendingUser] = await connection.query('SELECT * FROM pending_users WHERE token = ?', [token]);

        if (pendingUser.length === 0) {
            return res.status(404).send({ message: 'Token inválido o expirado.' });
        }

        const { name, email, password } = pendingUser[0];

        // Crear usuario en la tabla `users`
        await connection.query(
            'INSERT INTO users (name, email, pass, role) VALUES (?, ?, ?, ?)',
            [name, email, password, 'standard']
        );

        // Eliminar de `pending_users`
        await connection.query('DELETE FROM pending_users WHERE token = ?', [token]);

        res.status(200).send({ message: 'Correo confirmado. Usuario registrado exitosamente.' });
    } catch (err) {
        console.error('Error al confirmar el correo:', err);
        res.status(500).send({ message: 'Error en el servidor.' });
    }
};

export const resendConfirmation = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send({ message: 'El correo electrónico es obligatorio.' });
    }

    try {
        // Verificar si el usuario ya está registrado
        const [existingUser] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUser.length === 0) {
            return res.status(404).send({ message: 'El usuario no existe.' });
        }

        if (existingUser[0].confirmed) {
            return res.status(400).send({ message: 'El usuario ya está confirmado.' });
        }

        // Generar un nuevo token de confirmación
        const confirmationToken = jwt.sign(
            { email: email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Reenviar el correo de confirmación
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const confirmationLink = `http://localhost:4000/confirmEmail/${confirmationToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reenvío de confirmación de cuenta',
            html: `<p>Haz clic en el siguiente enlace para confirmar tu cuenta:</p>
                   <a href="${confirmationLink}">${confirmationLink}</a>`,
        });

        res.status(200).send({ message: 'Correo de confirmación reenviado.' });
    } catch (error) {
        console.error('Error al reenviar confirmación:', error);
        res.status(500).send({ message: 'Error al reenviar el correo de confirmación.' });
    }
};
