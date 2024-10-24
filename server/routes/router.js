import express from 'express';
import jwt from 'jsonwebtoken';
import { login } from '../controllers/loginController.js';
import { register } from '../controllers/registerController.js';
import { checkout } from '../controllers/cartController.js';

const router = express.Router();

// Middleware para verificar el token
function verifyToken(req, res, next) {
    const token = req.headers['authorization']; // Esperamos el token en el header
    if (!token) {
        return res.status(403).send('Access denied. No token provided.');
    }

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRETO, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token.');
        }
        req.user = user; // Guardamos la información del usuario para su uso posterior
        next();
    });
}

// Rutas
router.post('/login', login);
router.post('/register', register);
router.post('/checkout', verifyToken, checkout);

export default router;
