import connection from '../database/db.js';

export const getAllRoutineData = async (req, res) => {
    const { userId, routineId } = req.params;

    try {
        const query = `
            SELECT
                rl.week_number,
                rl.day_number,
                rl.date,
                rd.day_name AS routine_day_name,
                e.name AS exercise_name,
                e.video_url,
                d.warmup_sets,
                d.working_sets,
                d.reps,
                d.early_set_rpe,
                d.last_set_rpe,
                d.last_set_technique,
                d.rest_time,
                d.notes,
                rl.load_set_1,
                rl.load_set_2,
                rl.load_set_3,
                rl.load_set_4,
                rl.load_set_5,
                rl.load_set_6
            FROM exercise_loads rl
            JOIN day_exercises_details d ON rl.day_exercise_detail_id = d.id
            JOIN routine_days rd ON d.routine_day_id = rd.id
            JOIN exercises e ON d.exercise_id = e.id
            WHERE rl.user_id = ? AND rd.routine_id = ?
            ORDER BY rl.week_number, rl.day_number, d.id;
        `;

        const [rows] = await connection.query(query, [userId, routineId]);

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener los datos de la rutina:', error);
        res.status(500).json({ error: 'Error al obtener los datos de la rutina' });
    }
};
