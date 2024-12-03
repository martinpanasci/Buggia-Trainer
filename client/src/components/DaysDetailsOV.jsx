import React from 'react';

const DayDetails = ({ uniqueDays, exerciseVideos, toggleDayDetails, showDayDetails }) => {
    // Verifica si una columna está vacía
    const isColumnEmpty = (columnKey) => {
        return uniqueDays.every((day) =>
            day.exercises?.every((exercise) => !exercise[columnKey])
        );
    };

    // Define las columnas y aplica la validación
    const columns = [
        { key: "exercise_name", label: "Ejercicio" },
        { key: "last_set_technique", label: "Last Set Technique" },
        { key: "warmup_sets", label: "Warmup Sets" },
        { key: "working_sets", label: "Working Sets" },
        { key: "reps", label: "Reps" },
        { key: "early_set_rpe", label: "Early Set RPE" },
        { key: "last_set_rpe", label: "Last Set RPE" },
        { key: "rest_time", label: "Rest Time" },
        { key: "substitution1_name", label: "Sustituto 1" },
        { key: "substitution2_name", label: "Sustituto 2" },
        { key: "notes", label: "Notas" },
    ].filter((column) => !isColumnEmpty(column.key)); // Filtra columnas no vacías

    return (
        <div className="overview-routine__day-details">
            <div className="day-details-header" onClick={toggleDayDetails}>
                <h3 className="day-details-title">
                    Ver Días <span>{showDayDetails ? "▲" : "▼"}</span>
                </h3>
            </div>
            {showDayDetails && (
                <div className="day-details-content">
                    {uniqueDays.map((day) => (
                        <div key={day.id} className="overview-routine__day">
                            <h3>{day.day_name}</h3>
                            <table className="overview-routine__exercise-table">
                                <thead>
                                    <tr>
                                        {columns.map((column) => (
                                            <th key={column.key}>{column.label}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {day.exercises &&
                                        day.exercises.map((exercise) => (
                                            <tr key={exercise.exercise_id}>
                                                {columns.map((column) => (
                                                    <td key={column.key}>
                                                        {column.key === "exercise_name" ? (
                                                            exercise.exercise_video_url ? (
                                                                <a
                                                                    href={exercise.exercise_video_url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="exercise-name-link"
                                                                >
                                                                    {exercise.exercise_name}
                                                                </a>
                                                            ) : (
                                                                exercise.exercise_name
                                                            )
                                                        ) : column.key === "substitution1_name" ? (
                                                            exercise.substitution1_video_url ? (
                                                                <a
                                                                    href={exercise.substitution1_video_url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="exercise-name-link"
                                                                >
                                                                    {exercise.substitution1_name}
                                                                </a>
                                                            ) : (
                                                                exercise.substitution1_name || "-"
                                                            )
                                                        ) : column.key === "substitution2_name" ? (
                                                            exercise.substitution2_video_url ? (
                                                                <a
                                                                    href={exercise.substitution2_video_url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="exercise-name-link"
                                                                >
                                                                    {exercise.substitution2_name}
                                                                </a>
                                                            ) : (
                                                                exercise.substitution2_name || "-"
                                                            )
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
                    ))}
                </div>
            )}
        </div>
    );
};

export default DayDetails;
