import connection from '../database/db.js';

export const getRoutineSchedule = async (req, res) => {
  const { routineId } = req.params;

  try {
    const [rows] = await connection.query(`
      SELECT week_number, day_1, day_2, day_3, day_4, day_5, day_6, day_7, day_8, day_9, day_10
      FROM routine_schedule
      WHERE routine_id = ?
      ORDER BY week_number
    `, [routineId]);

    res.status(200).json(rows); // Enviar el cronograma de la rutina seleccionada
  } catch (error) {
    console.error('Error al obtener el cronograma de la rutina:', error);
    res.status(500).json({ error: 'Error al obtener el cronograma de la rutina' });
  }
};
