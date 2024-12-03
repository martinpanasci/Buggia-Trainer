import connection from '../database/db.js';

export const getCompletedDays = async (req, res) => {
    const { userId, routineId } = req.params; 

    try {
        const query = `
        SELECT DISTINCT el.week_number, el.day_number
        FROM exercise_loads el
        JOIN day_exercises_details ded ON el.day_exercise_detail_id = ded.id
        JOIN routine_days rd ON ded.routine_day_id = rd.id
        WHERE el.user_id = ? AND rd.routine_id = ?;
        `;

        const [rows] = await connection.query(query, [userId, routineId]);

        res.status(200).json(rows); // Devuelve los días completados filtrados por rutina
    } catch (error) {
        console.error('Error al obtener los días completados:', error);
        res.status(500).json({ error: 'Error al obtener los días completados' });
    }
};

