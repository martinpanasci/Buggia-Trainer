import connection from '../database/db.js';

export const getExercises = async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT id, name FROM exercises');
    //console.log('Ejercicios obtenidos desde la base de datos:', rows); // Verifica el contenido de rows
    res.status(200).json(rows); // Asegúrate de enviar todos los registros en un array
  } catch (error) {
    console.error('Error al obtener los ejercicios:', error);
    res.status(500).json({ error: 'Error al obtener los ejercicios' });
  }
};


