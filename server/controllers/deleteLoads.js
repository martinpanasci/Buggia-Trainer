import connection from '../database/db.js';

export const deleteExerciseloads = async (req, res) => {
    const { exerciseName, userId, weekNumber, dayNumber } = req.params;

    try {
        const query = `
        DELETE el
        FROM exercise_loads el
        JOIN day_exercises_details ded ON el.day_exercise_detail_id = ded.id
        JOIN exercises ex ON ded.exercise_id = ex.id
        WHERE ex.name = ? AND el.user_id = ? AND el.week_number = ? AND el.day_number = ?;
        `;

        const [result] = await connection.query(query, [exerciseName, userId, weekNumber, dayNumber]);
        
        if (result.affectedRows > 0) {
            res.status(200).send('Ejercicio eliminado correctamente');
        } else {
            res.status(404).send('No se encontró el ejercicio para eliminar');
        }
    } catch (error) {
        console.error('Error al eliminar el ejercicio:', error);
        res.status(500).send('Error al eliminar el ejercicio');
    }
};


export const deleteDayLoads = async (req, res) => {
    const { dayNumber, userId, weekNumber, routineId } = req.params;

    console.log("Parámetros recibidos:", { dayNumber, userId, weekNumber, routineId }); // Debug

    try {
        const query = `
        DELETE FROM exercise_loads
        WHERE user_id = ? AND week_number = ? AND day_number = ? AND day_exercise_detail_id IN (
            SELECT ded.id
            FROM day_exercises_details ded
            JOIN routine_days rd ON ded.routine_day_id = rd.id
            WHERE rd.routine_id = ?
        );
        `;

        const [result] = await connection.query(query, [userId, weekNumber, dayNumber, routineId]);

        console.log("Resultado de la eliminación:", result); // Debug
        if (result.affectedRows > 0) {
            res.status(200).send('Día eliminado correctamente');
        } else {
            res.status(404).send('No se encontraron registros para eliminar');
        }
    } catch (error) {
        console.error('Error al eliminar el día:', error);
        res.status(500).send('Error al eliminar el día');
    }
};

