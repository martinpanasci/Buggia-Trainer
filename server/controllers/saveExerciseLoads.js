import connection from '../database/db.js';

export const saveExerciseLoads = async (req, res) => {
    const { 
        user_id, 
        week_number, 
        day_number, 
        day_exercise_detail_id, 
        load_set_1, 
        load_set_2, 
        load_set_3, 
        load_set_4, 
        load_set_5, 
        load_set_6, 
        date 
    } = req.body;

    if (!user_id || !week_number || !day_number || !date) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
      
    try {
        const query = `
            INSERT INTO exercise_loads (
                user_id, 
                week_number, 
                day_number, 
                day_exercise_detail_id, 
                load_set_1, 
                load_set_2, 
                load_set_3, 
                load_set_4, 
                load_set_5, 
                load_set_6, 
                date
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
  
        await connection.query(query, [
            user_id, 
            week_number, 
            day_number, 
            day_exercise_detail_id, 
            load_set_1, 
            load_set_2, 
            load_set_3, 
            load_set_4, 
            load_set_5, 
            load_set_6, 
            date
        ]);

        res.status(201).json({ message: 'Carga guardada correctamente' });
    } catch (error) {
        console.error('Error al guardar la carga:', error);
        res.status(500).json({ error: 'Error al guardar la carga' });
    }
};

