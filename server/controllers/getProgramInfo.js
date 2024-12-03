import connection from '../database/db.js';

export const getProgramInfo = async (req, res) => {
  const { id } = req.params; // `id` aquí se refiere al `routine_id`
  try {
    // Buscar el programa basado en `routine_id`
    const [programRows] = await connection.query(
      'SELECT * FROM programs WHERE routine_id = ?',
      [id]
    );

    // Si no se encuentra el programa, enviamos un error
    if (programRows.length === 0) {
      return res.status(404).json({ error: 'Programa no encontrado para la rutina especificada' });
    }

    const program = programRows[0]; // Seleccionamos el programa encontrado

    // Consultar el nombre de la rutina desde la tabla `routines`
    const [routineRows] = await connection.query(
      'SELECT name FROM routines WHERE id = ?',
      [program.routine_id]
    );

    // Si no se encuentra la rutina, enviamos un error
    if (routineRows.length === 0) {
      return res.status(404).json({ error: 'Rutina no encontrada para el programa especificado' });
    }

    const routineName = routineRows[0].name;

    // Consultar los detalles del programa usando el ID del programa
    const [details] = await connection.query(
      'SELECT * FROM program_details WHERE program_id = ?',
      [program.id]
    );

    // Consultar las FAQs del programa usando el ID del programa
    const [faqs] = await connection.query(
      'SELECT * FROM program_faqs WHERE program_id = ?',
      [program.id]
    );

    // Estructuramos la respuesta
    res.status(200).json({
      data: {
        id: program.id,
        routine_id: program.routine_id,
        name: routineName, // Agregamos el nombre de la rutina
        description: program.description,
        image: program.image,
        categories: program.categories ? program.categories.split(',') : [],
        price: parseFloat(program.price).toFixed(2),
      },
      details: details.map((detail) => ({
        image: detail.image,
        description: detail.description,
      })),
      faqs: faqs.map((faq) => ({
        question: faq.question,
        answer: faq.answer,
      })),
    });
  } catch (error) {
    console.error('Error al obtener la información del programa:', error);
    res.status(500).json({ error: 'Error al obtener la información del programa' });
  }
};
