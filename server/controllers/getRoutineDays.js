import connection from '../database/db.js';

export const getRoutineDays = async (req, res) => {
  const { routineId } = req.params;

  try {
    const [rows] = await connection.query(`
      SELECT id, day_name
      FROM routine_days
      WHERE routine_id = ?
      ORDER BY day_name;
    `, [routineId]);

    res.status(200).json(rows); // Enviar los días de la rutina seleccionada
  } catch (error) {
    console.error('Error al obtener los días de la rutina:', error);
    res.status(500).json({ error: 'Error al obtener los días de la rutina' });
  }
};

