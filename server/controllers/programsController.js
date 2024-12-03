import connection from '../database/db.js';

export const getPrograms = async (req, res) => {
    try {
        const [programs] = await connection.query(`
            SELECT p.id AS program_id, r.name AS routine_name
            FROM programs p
            LEFT JOIN routines r ON p.routine_id = r.id
        `); // Unimos programs con routines para obtener los nombres de las rutinas
        
        res.status(200).json(programs);
    } catch (error) {
        console.error('Error al obtener los programas:', error);
        res.status(500).json({ message: 'Error al obtener los programas.' });
    }
};

export const deleteProgram = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Se requiere un ID de programa.' });
    }

    try {
        // Eliminar de `program_details`
        await connection.query('DELETE FROM program_details WHERE program_id = ?', [id]);

        // Eliminar de `program_faqs`
        await connection.query('DELETE FROM program_faqs WHERE program_id = ?', [id]);

        // Eliminar de `program_filters`
        await connection.query('DELETE FROM program_filters WHERE program_id = ?', [id]);

        // Eliminar de `programs`
        await connection.query('DELETE FROM programs WHERE id = ?', [id]);

        res.status(200).json({ message: 'Programa y datos relacionados eliminados exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar el programa:', error);
        res.status(500).json({ message: 'Error al eliminar el programa.' });
    }
};

