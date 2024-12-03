import connection from '../database/db.js';

export const assignRoutine = async (req, res) => {
  const { userId, routineId } = req.body;
  try {
    const query = 'INSERT INTO user_routines (user_id, routine_id) VALUES (?, ?)';
    await connection.query(query, [userId, routineId]);
    res.status(200).json({ message: 'Rutina asignada correctamente al usuario' });
  } catch (error) {
    console.error('Error al asignar la rutina:', error);
    res.status(500).json({ error: 'Error al asignar la rutina' });
  }
};

export const removeRoutine = async (req, res) => {
  const { userId, routineId } = req.params;
  try {
    const query = 'DELETE FROM user_routines WHERE user_id = ? AND routine_id = ?';
    const [result] = await connection.query(query, [userId, routineId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'La rutina no estaba asignada a este usuario' });
    }
    res.status(200).json({ message: 'Rutina removida correctamente del usuario' });
  } catch (error) {
    console.error('Error al remover la rutina:', error);
    res.status(500).json({ error: 'Error al remover la rutina' });
  }
};

export const getUserRoutines = async (req, res) => {
  const { userId } = req.params;
  try {
    const query = `
      SELECT r.id, r.name 
      FROM user_routines ur 
      JOIN routines r ON ur.routine_id = r.id 
      WHERE ur.user_id = ?
    `;
    const [rows] = await connection.query(query, [userId]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener las rutinas del usuario:', error);
    res.status(500).json({ error: 'Error al obtener las rutinas del usuario' });
  }
};

