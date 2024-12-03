import connection from '../database/db.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'buggiatrainer99@gmail.com',
        pass: 'pmgk ykbl jpoi hcig',
    },
});

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send({ message: 'El correo electrónico es requerido.' });
    }

    try {
        // Verifica si el usuario existe
        const [users] = await connection.query('SELECT id FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(404).send({ message: 'El correo electrónico no está registrado.' });
        }

        const userId = users[0].id;

        // Genera un token único
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hora desde ahora

        // Inserta o actualiza el token en la tabla password_resets
        await connection.query(
            `INSERT INTO password_resets (user_id, reset_token, reset_token_expires) 
             VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE reset_token = ?, reset_token_expires = ?`,
            [userId, resetToken, resetTokenExpires, resetToken, resetTokenExpires]
        );

        // Envía un correo con el enlace de recuperación
        const resetUrl = `http://localhost:4000/resetPassword/${resetToken}`;
        await transporter.sendMail({
            from: 'buggiatrainer99@gmail.com',
            to: email,
            subject: 'Recuperación de contraseña',
            html: `<p>Hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el enlace a continuación:</p>
                   <a href="${resetUrl}">Haga clic aquí para restablecer su contraseña</a>
                   <p>Si no solicitaste este cambio, ignora este correo.</p>`,
        });

        res.status(200).send({ message: 'Correo de recuperación enviado.' });
    } catch (error) {
        console.error('Error en forgotPassword:', error);
        res.status(500).send({ message: 'Error en el servidor.' });
    }
};

export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).send({ message: 'Token y nueva contraseña son requeridos.' });
    }

    try {
        // Verifica si el token es válido y no ha expirado
        const [results] = await connection.query(
            'SELECT user_id FROM password_resets WHERE reset_token = ? AND reset_token_expires > ?',
            [token, new Date()]
        );

        if (results.length === 0) {
            return res.status(400).send({ message: 'Token inválido o expirado.' });
        }

        const userId = results[0].user_id;

        // Hashea la nueva contraseña
        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        // Actualiza la contraseña del usuario
        await connection.query('UPDATE users SET pass = ? WHERE id = ?', [hashedPassword, userId]);

        // Elimina el token usado
        await connection.query('DELETE FROM password_resets WHERE reset_token = ?', [token]);

        res.status(200).send({ message: 'Contraseña actualizada exitosamente.' });
    } catch (error) {
        console.error('Error en resetPassword:', error);
        res.status(500).send({ message: 'Error en el servidor.' });
    }
};