import React from 'react';

const WeightsMenu = ({ exerciseLoads, expandedWeeks, toggleWeek, toggleWeightsMenu, showWeightsMenu, handleDeleteDay, handleDeleteExercise, userId, weekNumber, dayNumber, routineId }) => {
    // Define las columnas disponibles
    const allColumns = [
        { key: "exercise_name", label: "Ejercicio" },
        { key: "load_set_1", label: "Set 1" },
        { key: "load_set_2", label: "Set 2" },
        { key: "load_set_3", label: "Set 3" },
        { key: "load_set_4", label: "Set 4" },
        { key: "load_set_5", label: "Set 5" },
        { key: "load_set_6", label: "Set 6" },
        { key: "actions", label: "Accion" },
    ];

    // Función para determinar las columnas visibles para un día específico
    const getVisibleColumns = (exercises) => {
        const visibleColumns = allColumns.filter((column) => {
            if (column.key === "actions") return true; // Siempre mostrar "Accion"
            if (["load_set_1", "load_set_2", "load_set_3"].includes(column.key)) return true; // Siempre mostrar Set 1, Set 2, Set 3
            return exercises.some((exercise) => exercise[column.key]); // Mostrar si algún ejercicio tiene un valor
        });

        return visibleColumns;
    };

    return (
        <div className="weights-container">
            <div className="weights-header" onClick={toggleWeightsMenu}>
                <h3>Ver Pesos <span>{showWeightsMenu ? '▲' : '▼'}</span></h3>
            </div>
            {showWeightsMenu && (
                <div className="weights-weeks">
                    {Object.entries(
                        exerciseLoads.reduce((weeks, load) => {
                            const weekNumber = load.week_number;
                            if (!weeks[weekNumber]) {
                                weeks[weekNumber] = [];
                            }
                            weeks[weekNumber].push(load);
                            return weeks;
                        }, {})
                    ).map(([weekNumber, loads]) => (
                        <div key={`week-${weekNumber}`} className="week-container">
                            <div className="week-header" onClick={() => toggleWeek(weekNumber)}>
                                <h4>Semana {weekNumber} <span>{expandedWeeks[weekNumber] ? '▲' : '▼'}</span></h4>
                            </div>
                            {expandedWeeks[weekNumber] && (
                                <div className="days-container">
                                    {Object.entries(
                                        loads.reduce((days, load) => {
                                            const dayNumber = load.day_number;
                                            if (!days[dayNumber]) {
                                                days[dayNumber] = [];
                                            }
                                            days[dayNumber].push(load);
                                            return days;
                                        }, {})
                                    ).map(([dayNumber, exercises]) => {
                                        const visibleColumns = getVisibleColumns(exercises); // Determina las columnas visibles

                                        return (
                                            <div key={`day-${dayNumber}`} className="day-container">
                                                <div className="day-header">
                                                    <h5>Día {exercises[0].day_number}: {exercises[0].routine_day_name}</h5>
                                                    <div className="delete-day-btn-container">
                                                        <button
                                                            className="delete-day-btn"
                                                            onClick={() => handleDeleteDay(exercises[0].day_number, userId, weekNumber, routineId)}
                                                        >
                                                            Eliminar Día
                                                        </button>
                                                    </div>
                                                </div>
                                                <table className="day-table">
                                                    <thead>
                                                        <tr>
                                                            {visibleColumns.map((column) => (
                                                                <th key={column.key}>{column.label}</th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {exercises.map((exercise, index) => (
                                                            <tr key={`exercise-${dayNumber}-${index}`}>
                                                                {visibleColumns.map((column) => (
                                                                    <td key={column.key}>
                                                                        {column.key === "actions" ? (
                                                                            <button
                                                                                className="delete-exercise-btn"
                                                                                onClick={() => handleDeleteExercise(exercise.exercise_name, userId, weekNumber, dayNumber)}
                                                                            >
                                                                                Eliminar
                                                                            </button>
                                                                        ) : (
                                                                            exercise[column.key] || "-"
                                                                        )}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WeightsMenu;


