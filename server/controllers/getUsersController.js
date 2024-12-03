import connection from '../database/db.js';

export const getUsers = async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT id, email FROM users');
    res.status(200).json(rows); // Envía todos los usuarios en un array
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};
