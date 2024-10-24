import connection from '../database/db.js';
import bcrypt from 'bcrypt';

export const register = (req, res) => {
    const { name, email, password } = req.body;
    console.log({ name, email, password });

    if (!name || !email || !password) { // Validación de los campos requeridos
        return res.status(400).send({ message: 'Todos los campos son requeridos.' });
    }

    const checkUser = 'SELECT * FROM users WHERE email = ?';

    connection.query(checkUser, [email], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (result.length > 0) { // Si el usuario ya existe
            return res.status(409).send({ message: 'El correo ya está registrado.' });
        }

        // Hashear la contraseña antes de almacenar
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Insertar el nuevo usuario
        const insertUser = 'INSERT INTO users (email, name, pass) VALUES (?, ?, ?)';

        connection.query(insertUser, [email, name, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            res.status(201).send({ message: 'Usuario registrado exitosamente.' });
        });
    });
};
