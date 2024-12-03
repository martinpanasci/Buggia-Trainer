import connection from '../database/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const [users] = await connection.query('SELECT * FROM users WHERE email = ?', [username]);

        if (users.length > 0) {
            // Extraer la contraseña hasheada del resultado
            const hashedPassword = users[0].pass;

            // Comparar la contraseña ingresada con la hasheada
            const isMatch = await bcrypt.compare(password, hashedPassword);

            if (isMatch) {
                // Si las contraseñas coinciden, generar un token
                const userId = users[0].id;
                const role = users[0].role;
                const name = users[0].name;
                const token = jwt.sign({ user_id: userId, email: username, role, name }, process.env.JWT_SECRETO, { expiresIn: '300m' });     
                console.log('Token generado:', token);           
                res.send({ token });
            } else {
                res.status(401).send({ message: 'Contraseña incorrecta' });
            }
        } else {
            res.status(404).send({ message: 'Usuario no encontrado' });
        }
    } catch (err) {
        console.error("Error en el login:", err);
        res.status(500).send({ message: 'Error en el servidor' });
    }
};
