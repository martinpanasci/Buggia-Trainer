import connection from '../database/db.js';

export const getRoutines = async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM routines'); // Desestructurar para obtener un array plano
    //console.log('Rutinas obtenidas desde la base de datos:', rows); // Verifica el contenido de rows
    res.status(200).json(rows); // Enviar todas las rutinas en el array `rows`
  } catch (error) {
    console.error('Error al obtener las rutinas:', error);
    res.status(500).json({ error: 'Error al obtener las rutinas' });
  }
};



