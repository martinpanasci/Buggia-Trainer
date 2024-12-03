import connection from '../database/db.js';

export const saveEditRoutine = async (req, res) => {
    const { id, name } = req.query;
    try {
      const [result] = await connection.query(
        'UPDATE routines SET name = ? WHERE id = ?',
        [name, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Rutina no encontrada' });
      }
      res.status(200).json({ id, name });
    } catch (error) {
      res.status(500).json({ message: 'Error al guardar la rutina', error });
    }
  };

  export const saveEditDay = async (req, res) => {
    const { id, name } = req.query;    
    try {
      const [result] = await connection.query(
        'UPDATE routine_days SET day_name = ? WHERE id = ?',
        [name, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Día no encontrado' });
      }
      res.status(200).json({ id, name });
    } catch (error) {
      res.status(500).json({ message: 'Error al guardar el día', error });
    }
  };  

  export const saveEditDetails = async (req, res) => {
    const {
      day_exercise_detail_id,
      exercise_id,
      exercise_name,
      last_set_technique,
      warmup_sets,
      working_sets,
      reps,
      early_set_rpe,
      last_set_rpe,
      rest_time,
      substitution1_id,
      substitution1_name,
      substitution2_id,
      substitution2_name,
      notes,
    } = req.query;
  
    try {
      // Función auxiliar para verificar y actualizar nombres en la tabla exercises
      const updateExerciseName = async (id, newName) => {
        if (!newName) return; // Si no hay un nombre, no hacemos nada
  
        const [current] = await connection.query(
          `SELECT name FROM exercises WHERE id = ?`,
          [id]
        );
  
        if (current[0]?.name !== newName) {
          await connection.query(
            `UPDATE exercises SET name = ? WHERE id = ?`,
            [newName, id]
          );
        }
      };
  
      // Actualizar los nombres en exercises si cambiaron
      await updateExerciseName(exercise_id, exercise_name); // Ejercicio principal
      await updateExerciseName(substitution1_id, substitution1_name); // Sustituto 1
      await updateExerciseName(substitution2_id, substitution2_name); // Sustituto 2
  
      // Actualizar los detalles en day_exercises_details
      const [detailsUpdateResult] = await connection.query(
        `UPDATE day_exercises_details 
         SET last_set_technique = ?, warmup_sets = ?, 
             working_sets = ?, reps = ?, early_set_rpe = ?, 
             last_set_rpe = ?, rest_time = ?, notes = ?
         WHERE id = ?`,
        [
          last_set_technique,
          warmup_sets,
          working_sets,
          reps,
          early_set_rpe,
          last_set_rpe,
          rest_time,
          notes,
          day_exercise_detail_id,
        ]
      );
  
      if (detailsUpdateResult.affectedRows === 0) {
        return res.status(404).json({ message: 'Detalles no encontrados' });
      }
  
      // Responder con los datos actualizados
      res.status(200).json({
        day_exercise_detail_id,
        exercise_id,
        exercise_name,
        last_set_technique,
        warmup_sets,
        working_sets,
        reps,
        early_set_rpe,
        last_set_rpe,
        rest_time,
        substitution1_id,
        substitution1_name,
        substitution2_id,
        substitution2_name,
        notes,
      });
    } catch (error) {
      console.error("Error al guardar los detalles del ejercicio:", error);
      res.status(500).json({ message: "Error al guardar los detalles", error });
    }
  };
  
  
  
  
  