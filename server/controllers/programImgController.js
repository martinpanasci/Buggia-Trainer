import connection from '../database/db.js';

export const getProgramImgByRoutineId = async (req, res) => {
    const { routineId } = req.params;

    try {
        const query = `
            SELECT id, routine_id, description, image, categories, price
            FROM programs
            WHERE routine_id = ?
        `;
        const [rows] = await connection.query(query, [routineId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'No se encontró un programa para esta rutina' });
        }

        res.status(200).json(rows[0]); // Retornamos el primer resultado
    } catch (error) {
        console.error('Error al obtener el programa:', error);
        res.status(500).json({ error: 'Error al obtener el programa' });
    }
};
