import connection from '../database/db.js';

export const getDayExerciseDetails = async (req, res) => {
  const { dayId } = req.params;

  try {
    const query = `
      SELECT
      d.id AS day_exercise_detail_id, 
      e.id AS exercise_id,
      e.name AS exercise_name,
      e.video_url AS exercise_video_url, -- URL del video del ejercicio principal
      d.last_set_technique,
      d.warmup_sets,
      d.working_sets,
      d.reps,
      d.early_set_rpe,
      d.last_set_rpe,
      d.rest_time,
      s1.id AS substitution1_id,
      s1.name AS substitution1_name,
      s1.video_url AS substitution1_video_url, -- URL del video del sustituto 1
      s2.id AS substitution2_id,
      s2.name AS substitution2_name,
      s2.video_url AS substitution2_video_url, -- URL del video del sustituto 2
      d.notes
     FROM day_exercises_details d
     JOIN exercises e ON d.exercise_id = e.id -- Unimos con la tabla exercises para el ejercicio principal
     LEFT JOIN exercises s1 ON d.substitution_1 = s1.id -- Unimos con la tabla exercises para el sustituto 1
     LEFT JOIN exercises s2 ON d.substitution_2 = s2.id -- Unimos con la tabla exercises para el sustituto 2
     WHERE d.routine_day_id = ?      
    `;
    const [rows] = await connection.query(query, [dayId]);

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los detalles de los ejercicios del día:', error);
    res.status(500).json({ error: 'Error al obtener los detalles de los ejercicios del día' });
  }
};
