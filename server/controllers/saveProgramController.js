import connection from "../database/db.js";

export const saveProgram = async (req, res) => {
  try {
    const { routine_id, description, image, categories, price, details, faqs, filters } = req.body;

    // Validar datos principales
    if (!routine_id || !description || !image || !categories || !price) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Guardar el programa en la base de datos
    const [programResult] = await connection.query(
      `INSERT INTO programs (routine_id, description, image, categories, price) VALUES (?, ?, ?, ?, ?)`,
      [routine_id, description, image, categories, price]
    );

    const programId = programResult.insertId;

    // Guardar detalles
    for (const detail of details) {
      await connection.query(
        `INSERT INTO program_details (program_id, image, description) VALUES (?, ?, ?)`,
        [programId, detail.image, detail.description]
      );
    }

    // Guardar FAQs
    for (const faq of faqs) {
      await connection.query(
        `INSERT INTO program_faqs (program_id, question, answer) VALUES (?, ?, ?)`,
        [programId, faq.question, faq.answer]
      );
    }

    // Guardar filtros
    if (filters && Array.isArray(filters)) {
      for (const filter of filters) {
        const { filter_name, filter_value } = filter;

        // Validar que ambos valores existan
        if (filter_name && filter_value) {
          await connection.query(
            `INSERT INTO program_filters (program_id, filter_name, filter_value) VALUES (?, ?, ?)`,
            [programId, filter_name, filter_value]
          );
        }
      }
    }

    res.status(201).json({ message: "Programa guardado exitosamente", programId });
  } catch (error) {
    console.error("Error al guardar el programa:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
