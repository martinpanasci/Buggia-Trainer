import connection from '../database/db.js';

export const saveRoutineSchedule = async (req, res) => {
  const routineSchedule = req.body; // Array de semanas

  try {
    for (const weekData of routineSchedule) {
      const { routine_id, week_number, day_1, day_2, day_3, day_4, day_5, day_6, day_7, day_8, day_9, day_10 } = weekData;
      
      const query = `
        INSERT INTO routine_schedule (routine_id, week_number, day_1, day_2, day_3, day_4, day_5, day_6, day_7, day_8, day_9, day_10)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [routine_id, week_number, day_1, day_2, day_3, day_4, day_5, day_6, day_7, day_8, day_9, day_10];

      await connection.query(query, values); // Inserta la semana en la base de datos
    }

    res.status(201).json({ message: 'Organización de la rutina guardada exitosamente' });
  } catch (error) {
    console.error('Error al guardar la organización de la rutina:', error);
    res.status(500).json({ error: 'Error al guardar la organización de la rutina' });
  }
};

