import mysql from 'mysql2/promise';

// Crear un pool de conexiones
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login_node_jwt',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportar el pool directamente
export default connection;
