import connection from '../database/db.js';

export const getExerciseVideos = async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT id, video_url FROM exercises');
    res.status(200).json(rows); // Devuelve todos los ejercicios con sus videos
  } catch (error) {
    console.error('Error al obtener los videos de los ejercicios:', error);
    res.status(500).json({ error: 'Error al obtener los videos de los ejercicios' });
  }
};

