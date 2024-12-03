import connection from '../database/db.js';

export const addExercise = async (req, res) => {
  const { name, videoUrl } = req.body;

  try {
    // Insertar el nuevo ejercicio en la base de datos
    const [result] = await connection.query(
      'INSERT INTO exercises (name, video_url) VALUES (?, ?)',
      [name, videoUrl]
    );

    // Devolver el ejercicio recién creado con su ID
    const newExercise = {
      id: result.insertId,
      name,
      videoUrl,
    };

    res.status(201).json(newExercise);
    console.log(`Ejercicio "${name}" agregado correctamente con ID: ${newExercise.id}`);
  } catch (error) {
    console.error('Error al agregar el ejercicio:', error);
    res.status(500).json({ error: 'Error al agregar el ejercicio' });
  }
};
