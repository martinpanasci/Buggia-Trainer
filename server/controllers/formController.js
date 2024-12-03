import connection from '../database/db.js';

export const form = async (req, res) => {
  const { name, trainingDays } = req.body;

  try {
    // Paso 1: Insertar la rutina si no existe
    let routineId;
    const [routine] = await connection.query('SELECT id FROM routines WHERE name = ?', [name]);

    if (routine.length === 0) {
      const [insertResult] = await connection.query('INSERT INTO routines (name) VALUES (?)', [name]);
      routineId = insertResult.insertId;
      console.log(`Rutina creada con ID: ${routineId}`);
    } else {
      routineId = routine[0].id;
      console.log(`Rutina existente encontrada con ID: ${routineId}`);
    }

    // Paso 2: Insertar los días de entrenamiento
    for (const day of trainingDays) {
      let routineDayId;
      const [existingDay] = await connection.query(
        'SELECT id FROM routine_days WHERE day_name = ? AND routine_id = ?', 
        [day.dayName, routineId]
      );

      if (existingDay.length === 0) {
        const [dayInsertResult] = await connection.query(
          'INSERT INTO routine_days (day_name, routine_id) VALUES (?, ?)', 
          [day.dayName, routineId]
        );
        routineDayId = dayInsertResult.insertId;
        console.log(`Día de entrenamiento creado con ID: ${routineDayId}`);
      } else {
        routineDayId = existingDay[0].id;
        console.log(`Día de entrenamiento existente encontrado con ID: ${routineDayId}`);
      }

      // Paso 3: Insertar los detalles de los ejercicios
      for (const exercise of day.exercises) {
        const result = await connection.query(
          'INSERT INTO day_exercises_details (routine_day_id, exercise_id, last_set_technique, warmup_sets, working_sets, reps, early_set_rpe, last_set_rpe, rest_time, substitution_1, substitution_2, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            routineDayId,
            exercise.exercise_id,
            exercise.lastSetTechnique,
            exercise.warmupSets,
            exercise.workingSets,
            exercise.reps,
            exercise.earlySetRPE,
            exercise.lastSetRPE,
            exercise.restTime,
            exercise.substitution1,
            exercise.substitution2,
            exercise.notes,
          ]
        );
        console.log(`Ejercicio guardado con ID de día: ${routineDayId}, ID de ejercicio: ${exercise.exercise_id}`);
      }
    }

    console.log(`Rutina "${name}" guardada correctamente con sus días y ejercicios.`);
    res.status(200).json({ message: 'Rutina guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar la rutina:', error);
    res.status(500).json({ error: 'Error al guardar la rutina' });
  }
};
