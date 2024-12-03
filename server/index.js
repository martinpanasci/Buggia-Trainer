import express from 'express';
import routes from './routes/router.js';
import cors from 'cors';
//import morgan from 'morgan';
import dotenv from 'dotenv';

// Configurar dotenv para cargar variables de entorno
dotenv.config();

const app = express();
const port = 3000;

// Middleware
//app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configuración de CORS
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:4000"],
    methods: ["GET", "POST", "DELETE", "PUT"]
}));

// Configurar rutas
app.use('/', routes);

// Eliminar el caché al hacer logout
app.use((req, res, next) => {
    if (!req.user) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache'); // Para HTTP/1.0
        res.header('Expires', '-1'); // Asegura que la página está expirada
    }
    next();
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
