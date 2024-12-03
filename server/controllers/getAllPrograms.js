import connection from '../database/db.js';

export const getAllPrograms = async (req, res) => {
  try {
    // Obtener todos los programas
    const [programs] = await connection.query('SELECT * FROM programs');

    // Obtener todos los filtros
    const [filters] = await connection.query('SELECT * FROM program_filters');

    // Obtener los nombres de las rutinas desde la tabla routines
    const [routines] = await connection.query('SELECT id, name FROM routines');

    // Asociar filtros y nombres de rutinas con los programas
    const programsWithFilters = programs.map((program) => {
      // Obtener los filtros asociados al programa
      const programFilters = filters.filter((filter) => filter.program_id === program.id);

      // Estructurar los filtros en un objeto para mayor facilidad en el frontend
      const filterObject = programFilters.reduce((acc, filter) => {
        if (!acc[filter.filter_name]) {
          acc[filter.filter_name] = [];
        }
        acc[filter.filter_name].push(filter.filter_value);
        return acc;
      }, {});

      // Obtener el nombre de la rutina asociada al programa
      const routine = routines.find((routine) => routine.id === program.routine_id);
      const routineName = routine ? routine.name : null;

      return {
        ...program,
        filters: filterObject,
        name: routineName, // Agregar el nombre de la rutina
      };
    });

    res.status(200).json(programsWithFilters);
  } catch (error) {
    console.error('Error al obtener los programas:', error);
    res.status(500).json({ error: 'Error al obtener los programas' });
  }
};
