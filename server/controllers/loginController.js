import connection from '../database/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const login = (req, res) => {
    const { username, password } = req.body;  
    const consult = 'SELECT * FROM users WHERE email = ?';

    try {
        connection.query(consult, [username], (err, result) => {
            if (err) {
                return res.send(err);
            }
            if (result.length > 0) {
                // Extraer la contraseña hasheada del resultado
                const hashedPassword = result[0].pass;
                // Comparar la contraseña ingresada con la hasheada
                bcrypt.compare(password, hashedPassword, (err, isMatch) => {
                    if (err) {
                        return res.send(err);
                    }
                    if (isMatch) {
                        // Si las contraseñas coinciden, generar un token
                        const token = jwt.sign({ username }, process.env.JWT_SECRETO, { expiresIn: '300m' });
                        res.send({ token });
                    } else {
                        res.send({ message: 'Contraseña incorrecta' });
                    }
                });
            } else {
                res.send({ message: 'Usuario no encontrado' });
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Error en el servidor' });
    }
};
