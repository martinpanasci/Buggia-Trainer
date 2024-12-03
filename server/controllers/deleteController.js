import connection from '../database/db.js';

// Eliminar una rutina completa y todos los datos asociados
export const deleteRoutine = async (req, res) => {
    const { id } = req.params;
    try {
        await connection.query('DELETE FROM day_exercises_details WHERE routine_day_id IN (SELECT id FROM routine_days WHERE routine_id = ?)', [id]);
        await connection.query('DELETE FROM routine_days WHERE routine_id = ?', [id]);
        await connection.query('DELETE FROM routine_schedule WHERE routine_id = ?', [id]);
        await connection.query('DELETE FROM routines WHERE id = ?', [id]);
        res.status(200).json({ message: 'Rutina eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la rutina', error });
    }
};

// Eliminar toda la organización (schedule) de una rutina
export const deleteSchedule = async (req, res) => {
    const { routineId } = req.params;
    try {
        await connection.query('DELETE FROM routine_schedule WHERE routine_id = ?', [routineId]);
        res.status(200).json({ message: 'Organización eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la organización', error });
    }
};

// Eliminar un día específico
export const deleteDay = async (req, res) => {
    const { dayId } = req.params;
    try {
        await connection.query('DELETE FROM day_exercises_details WHERE routine_day_id = ?', [dayId]);
        await connection.query('DELETE FROM routine_days WHERE id = ?', [dayId]);
        res.status(200).json({ message: 'Día eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el día', error });
    }
};

// Eliminar detalles de un ejercisio
export const deleteDetails = async (req, res) => {
    const { exerciseId } = req.params;
    try {
        await connection.query('DELETE FROM day_exercises_details WHERE exercise_id = ?', [exerciseId]);
        res.status(200).json({ message: 'Ejercicio eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el ejercicio', error });
    }
};

// Eliminar un ejercicio específico
export const deleteExercise = async (req, res) => {
    const { id } = req.params;
    try {
        await connection.query('DELETE FROM exercises WHERE id = ?', [id]);
        res.status(200).json({ message: 'Ejercicio eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el ejercicio', error });
    }
};