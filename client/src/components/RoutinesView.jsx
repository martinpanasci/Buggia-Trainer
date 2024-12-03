import React, { useState, useEffect } from 'react';
import ConfirmModal from './ConfirmModal';
import './styles/RoutinesView.css';

const RoutinesView = () => {
  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [weeksSchedule, setWeeksSchedule] = useState([]);
  const [uniqueDays, setUniqueDays] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // Indica el elemento a eliminar
  const [deleteType, setDeleteType] = useState(''); // Tipo de eliminación (rutina, semana, día, ejercicio)

  const [isEditingRoutine, setIsEditingRoutine] = useState(false); // Para manejar el estado de edición del nombre de la rutina
  const [editedRoutineName, setEditedRoutineName] = useState(''); // Para el nuevo nombre de la rutina

  const [isEditingDay, setIsEditingDay] = useState(false);
  const [editingDayId, setEditingDayId] = useState(null); // ID del día que se está editando
  const [editedDayName, setEditedDayName] = useState(''); // Para el nuevo nombre del día

  const [editingExerciseId, setEditingExerciseId] = useState(null); // ID del ejercicio que se está editando
  const [editedExerciseDetails, setEditedExerciseDetails] = useState({}); // Para los detalles del ejercicio



  useEffect(() => {  //obtine rutinas de la DB
    const fetchRoutines = async () => {
      try {
        const response = await fetch('http://localhost:3000/getRoutines');
        if (!response.ok) throw new Error('Error al obtener las rutinas');
        const data = await response.json();
        setRoutines(data);
      } catch (error) {
        console.error('Error al obtener las rutinas:', error);
      }
    };

    fetchRoutines();
  }, []);

  const handleRoutineChange = async (e) => {
    const routineId = e.target.value;
    const routine = routines.find((r) => r.id === parseInt(routineId));
    setSelectedRoutine(routine);

    if (routine) {
      try {
        const scheduleResponse = await fetch(`http://localhost:3000/getRoutineSchedule/${routineId}`);
        if (!scheduleResponse.ok) throw new Error('Error al obtener el cronograma de la rutina');
        const scheduleData = await scheduleResponse.json();
        setWeeksSchedule(scheduleData);

        const daysResponse = await fetch(`http://localhost:3000/getRoutineDays/${routineId}`);
        if (!daysResponse.ok) throw new Error('Error al obtener los días de la rutina');
        const daysData = await daysResponse.json();

        const daysWithDetails = await Promise.all(daysData.map(async (day) => {
          const exercisesResponse = await fetch(`http://localhost:3000/getDayExerciseDetails/${day.id}`);
          if (!exercisesResponse.ok) throw new Error('Error al obtener los detalles de los ejercicios del día');
          const exercisesData = await exercisesResponse.json();
          return { ...day, exercises: exercisesData };
        }));

        setUniqueDays(daysWithDetails);        
      } catch (error) {
        console.error('Error al obtener la información de la rutina:', error);
      }
    } else {
      setWeeksSchedule([]);
      setUniqueDays([]);
    }
  };

  const getDayName = (dayId) => {
    const day = uniqueDays.find((d) => d.id === dayId);
    return day ? day.day_name : 'Día Libre';
  };

  const daysCount = weeksSchedule.reduce((max, week) => {
    const weekDaysCount = Object.keys(week).filter((key) => key.startsWith('day_') && week[key]).length;
    return Math.max(max, weekDaysCount);
  }, 0);

  const openDeleteRoutineModal = (routineId) => {
    setDeleteType('routine');
    setDeleteTarget(routineId);
    setIsModalOpen(true);
  };

  const openDeleteScheduleModal = (routineId) => {
    setDeleteType('schedule');
    setDeleteTarget(routineId);
    setIsModalOpen(true);
  };

  const openDeleteDayModal = (dayId) => {
    setDeleteType('day');
    setDeleteTarget(dayId);
    setIsModalOpen(true);
  };

  const openDeleteExerciseModal = (exerciseId) => {
    setDeleteType('exercise');
    setDeleteTarget(exerciseId);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (deleteType === 'routine') {
        await fetch(`http://localhost:3000/deleteRoutine/${deleteTarget}`, { method: 'DELETE' });
        setRoutines(routines.filter(routine => routine.id !== deleteTarget));
        setSelectedRoutine(null);
      } else if (deleteType === 'schedule') {
        await fetch(`http://localhost:3000/deleteSchedule/${deleteTarget}`, { method: 'DELETE' });
        setWeeksSchedule([]);
      } else if (deleteType === 'day') {
        await fetch(`http://localhost:3000/deleteDay/${deleteTarget}`, { method: 'DELETE' });
        setUniqueDays(uniqueDays.filter(day => day.id !== deleteTarget));
      } else if (deleteType === 'exercise') {
        await fetch(`http://localhost:3000/deleteDetails/${deleteTarget}`, { method: 'DELETE' });
        const updatedDays = uniqueDays.map(day => ({
          ...day,
          exercises: day.exercises.filter(exercise => exercise.exercise_id !== deleteTarget),
        }));
        setUniqueDays(updatedDays);
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
    } finally {
      setIsModalOpen(false);
      setDeleteTarget(null);
      setDeleteType('');
    }
  };

  const handleSaveRoutine = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/saveEditRoutine?id=${selectedRoutine.id}&name=${editedRoutineName}`
      );
      if (!response.ok) throw new Error("Error al guardar la rutina");
      const updatedRoutine = await response.json();

      // Actualizamos el estado de las rutinas
      setRoutines((prevRoutines) =>
        prevRoutines.map((routine) =>
          routine.id === updatedRoutine.id ? updatedRoutine : routine
        )
      );
      setIsEditingRoutine(false);
      alert("Guardado con exito! F5 para ver los cambios");
    } catch (error) {
      console.error("Error al guardar la rutina:", error);
    }
  };

  const handleSaveDay = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/saveEditDay?id=${editingDayId}&name=${editedDayName}`
      );
      if (!response.ok) throw new Error("Error al guardar el día");
      const updatedDay = await response.json();

      // Actualizamos el estado de los días únicos
      setUniqueDays((prevDays) =>
        prevDays.map((day) =>
          day.id === updatedDay.id ? { ...day, day_name: updatedDay.name } : day
        )
      );
      setEditingDayId(false);
      alert("Guardado con exito! F5 para ver los cambios");
    } catch (error) {
      console.error("Error al guardar el día:", error);
    }
  };

  const handleSaveDetails = async () => {
    try {
      const queryParams = new URLSearchParams({
        ...editedExerciseDetails, // Enviamos toda la información tal cual está en editedExerciseDetails
      }).toString();

      const response = await fetch(
        `http://localhost:3000/saveEditDetails?${queryParams}`
      );
      if (!response.ok) throw new Error("Error al guardar los detalles del ejercicio");
      const updatedExercise = await response.json();

      // Actualizamos el estado de los ejercicios
      setUniqueDays((prevDays) =>
        prevDays.map((day) => ({
          ...day,
          exercises: day.exercises.map((exercise) =>
            exercise.exercise_id === updatedExercise.exercise_id
              ? updatedExercise
              : exercise
          ),
        }))
      );
      setEditingExerciseId(false);
      alert("Guardado con exito! F5 para ver los cambios");
    } catch (error) {
      console.error("Error al guardar los detalles del ejercicio:", error);
    }
  };

  return (
    <div className="routine-viewer">
      <h2 className="routine-viewer__title">Visualizar Rutina</h2>

      <label className="routine-viewer__label">
        Seleccionar Rutina:
        <select
          className="routine-viewer__select"
          value={selectedRoutine ? selectedRoutine.id : ''}
          onChange={handleRoutineChange}
        >
          <option value="">Seleccione una rutina</option>
          {routines.map((routine) => (
            <option key={routine.id} value={routine.id}>{routine.name}</option>
          ))}
        </select>
      </label>

      {selectedRoutine && (
        <div className="edit-delete-container-routinesview">
          <>
            {!isEditingRoutine && (
              <button onClick={() => openDeleteRoutineModal(selectedRoutine.id)} className="delete-button">
                Eliminar Rutina
              </button>
            )}
            <button
              onClick={() => {
                setIsEditingRoutine(!isEditingRoutine);
                setEditedRoutineName(selectedRoutine.name); // Rellenamos con el nombre actual
              }}
              className="edit-button-routinesview"
            >
              {isEditingRoutine ? "Cancelar" : "Editar Rutina"}
            </button>

            {isEditingRoutine && (
              <div className="edit-routine-container-routinesview">
                <input
                  type="text"
                  value={editedRoutineName}
                  onChange={(e) => setEditedRoutineName(e.target.value)}
                  className="edit-input-routinesview"
                />
                <button
                  onClick={async () => {
                    await handleSaveRoutine();
                    setIsEditingRoutine(false);
                  }}
                  className="save-button-routinesview"
                >
                  Guardar
                </button>
              </div>
            )}
          </>
        </div>
      )}

      {weeksSchedule.length > 0 && (
        <>
          <table className="routine-viewer__table">
            <thead>
              <tr>
                <th>Semana</th>
                {Array.from({ length: daysCount }).map((_, i) => (
                  <th key={i}>Día {i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeksSchedule.map((week, weekIndex) => (
                <tr key={weekIndex}>
                  <td>Semana {week.week_number}</td>
                  {Array.from({ length: daysCount }).map((_, dayIndex) => {
                    const dayId = week[`day_${dayIndex + 1}`];
                    const columnClass = dayIndex % 2 === 0 ? "day-column-light" : "day-column-dark";
                    return dayId ? (
                      <td key={dayIndex} className={columnClass}>{getDayName(dayId)}</td>
                    ) : null;
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="delete-button"
            onClick={() => openDeleteScheduleModal(selectedRoutine.id)}
          >
            Eliminar Organización
          </button>

        </>
      )}

      {uniqueDays.length > 0 && (
        <div className="routine-viewer__day-details">
          {uniqueDays.map((day) => (
            <div key={day.id} className="routine-viewer__day">
              <div className="routine-viewer__day-header">
                <h3>{day.day_name}</h3>
                <button onClick={() => { setIsEditingDay(!isEditingDay); setEditedDayName(day.day_name); setEditingDayId(day.id) }} className="edit-button-day-routinesview">
                  {isEditingDay ? "Cancelar" : "Editar Dia"}
                </button>
                {!isEditingDay && (
                  <button onClick={() => openDeleteDayModal(day.id)} className="delete-button">
                    Eliminar Día
                  </button>
                )}

                {isEditingDay && (
                  <div className="edit-day-container-routinesview">
                    <input
                      type="text"
                      value={editedDayName}
                      onChange={(e) => setEditedDayName(e.target.value)}
                      className="edit-input-day-routinesview"
                    />
                    <button
                      onClick={async () => {
                        await handleSaveDay();
                        setIsEditingDay(false);
                      }}
                      className="save-button-day-routinesview"
                    >
                      Guardar
                    </button>
                  </div>
                )}

              </div>
              <table className="routine-viewer__exercise-table">
                <thead>
                  <tr>
                    <th>Ejercicio</th>
                    <th>Last Set Technique</th>
                    <th>Warmup Sets</th>
                    <th>Working Sets</th>
                    <th>Reps</th>
                    <th>Early Set RPE</th>
                    <th>Last Set RPE</th>
                    <th>Rest Time</th>
                    <th>Sustituto 1</th>
                    <th>Sustituto 2</th>
                    <th>Notas</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {day.exercises &&
                    day.exercises.map((exercise) => (
                      <tr key={exercise.exercise_id}>
                        <td>
                          {editingExerciseId === exercise.exercise_id ? (
                            <input
                              type="text"
                              value={editedExerciseDetails.exercise_name || ""}
                              onChange={(e) =>
                                setEditedExerciseDetails({
                                  ...editedExerciseDetails,
                                  exercise_name: e.target.value,
                                })
                              }
                              className="edit-input-exercise-name-routinesview"
                            />
                          ) : exercise.exercise_video_url ? (
                            <a
                              href={exercise.exercise_video_url}
                              target="_blank" // Abre en una nueva pestaña
                              rel="noopener noreferrer" // Mejora de seguridad
                              className="exercise-name-link"
                            >
                              {exercise.exercise_name}
                            </a>
                          ) : (
                            <span className="exercise-name-no-link">{exercise.exercise_name}</span>
                          )}
                        </td>
                        <td>
                          {editingExerciseId === exercise.exercise_id ? (
                            <input
                              type="text"
                              value={editedExerciseDetails.last_set_technique || ""}
                              onChange={(e) =>
                                setEditedExerciseDetails({
                                  ...editedExerciseDetails,
                                  last_set_technique: e.target.value,
                                })
                              }
                              className="edit-input-exercise-detail-routinesview"
                            />
                          ) : (
                            exercise.last_set_technique
                          )}
                        </td>
                        <td>
                          {editingExerciseId === exercise.exercise_id ? (
                            <input
                              type="text"
                              value={editedExerciseDetails.warmup_sets || ""}
                              onChange={(e) =>
                                setEditedExerciseDetails({
                                  ...editedExerciseDetails,
                                  warmup_sets: e.target.value,
                                })
                              }
                              className="edit-input-exercise-detail-routinesview"
                            />
                          ) : (
                            exercise.warmup_sets
                          )}
                        </td>
                        <td>
                          {editingExerciseId === exercise.exercise_id ? (
                            <input
                              type="text"
                              value={editedExerciseDetails.working_sets || ""}
                              onChange={(e) =>
                                setEditedExerciseDetails({
                                  ...editedExerciseDetails,
                                  working_sets: e.target.value,
                                })
                              }
                              className="edit-input-exercise-detail-routinesview"
                            />
                          ) : (
                            exercise.working_sets
                          )}
                        </td>
                        <td>
                          {editingExerciseId === exercise.exercise_id ? (
                            <input
                              type="text"
                              value={editedExerciseDetails.reps || ""}
                              onChange={(e) =>
                                setEditedExerciseDetails({
                                  ...editedExerciseDetails,
                                  reps: e.target.value,
                                })
                              }
                              className="edit-input-exercise-detail-routinesview"
                            />
                          ) : (
                            exercise.reps
                          )}
                        </td>
                        <td>
                          {editingExerciseId === exercise.exercise_id ? (
                            <input
                              type="text"
                              value={editedExerciseDetails.early_set_rpe || ""}
                              onChange={(e) =>
                                setEditedExerciseDetails({
                                  ...editedExerciseDetails,
                                  early_set_rpe: e.target.value,
                                })
                              }
                              className="edit-input-exercise-detail-routinesview"
                            />
                          ) : (
                            exercise.early_set_rpe
                          )}
                        </td>
                        <td>
                          {editingExerciseId === exercise.exercise_id ? (
                            <input
                              type="text"
                              value={editedExerciseDetails.last_set_rpe || ""}
                              onChange={(e) =>
                                setEditedExerciseDetails({
                                  ...editedExerciseDetails,
                                  last_set_rpe: e.target.value,
                                })
                              }
                              className="edit-input-exercise-detail-routinesview"
                            />
                          ) : (
                            exercise.last_set_rpe
                          )}
                        </td>
                        <td>
                          {editingExerciseId === exercise.exercise_id ? (
                            <input
                              type="text"
                              value={editedExerciseDetails.rest_time || ""}
                              onChange={(e) =>
                                setEditedExerciseDetails({
                                  ...editedExerciseDetails,
                                  rest_time: e.target.value,
                                })
                              }
                              className="edit-input-exercise-detail-routinesview"
                            />
                          ) : (
                            exercise.rest_time
                          )}
                        </td>
                        <td>
                          {editingExerciseId === exercise.exercise_id ? (
                            <input
                              type="text"
                              value={editedExerciseDetails.substitution1_name || ""}
                              onChange={(e) =>
                                setEditedExerciseDetails({
                                  ...editedExerciseDetails,
                                  substitution1_name: e.target.value,
                                })
                              }
                              className="edit-input-exercise-detail-routinesview"
                            />
                          ) : exercise.substitution1_video_url ? (
                            <a
                              href={exercise.substitution1_video_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="exercise-name-link"
                            >
                              {exercise.substitution1_name}
                            </a>
                          ) : (
                            <span className="exercise-name-no-link">{exercise.substitution1_name}</span>
                          )}
                        </td>
                        <td>
                          {editingExerciseId === exercise.exercise_id ? (
                            <input
                              type="text"
                              value={editedExerciseDetails.substitution2_name || ""}
                              onChange={(e) =>
                                setEditedExerciseDetails({
                                  ...editedExerciseDetails,
                                  substitution2_name: e.target.value,
                                })
                              }
                              className="edit-input-exercise-detail-routinesview"
                            />
                          ) : exercise.substitution2_video_url ? (
                            <a
                              href={exercise.substitution2_video_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="exercise-name-link"
                            >
                              {exercise.substitution2_name}
                            </a>
                          ) : (
                            <span className="exercise-name-no-link">{exercise.substitution2_name}</span>
                          )}
                        </td>
                        <td>
                          {editingExerciseId === exercise.exercise_id ? (
                            <input
                              type="text"
                              value={editedExerciseDetails.notes || ""}
                              onChange={(e) =>
                                setEditedExerciseDetails({
                                  ...editedExerciseDetails,
                                  notes: e.target.value,
                                })
                              }
                              className="edit-input-exercise-notes-routinesview"
                            />
                          ) : (
                            exercise.notes
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              if (editingExerciseId === exercise.exercise_id) {
                                setEditingExerciseId(null);
                                setEditedExerciseDetails({});
                              } else {
                                setEditingExerciseId(exercise.exercise_id);
                                setEditedExerciseDetails(exercise);
                              }
                            }}
                            className="edit-button-exercise-routinesview"
                          >
                            {editingExerciseId === exercise.exercise_id ? "Cancelar" : "Editar"}
                          </button>
                          {editingExerciseId === exercise.exercise_id && (
                            <button
                              onClick={async () => {
                                await handleSaveDetails();
                                setEditingExerciseId(null);
                              }}
                              className="save-button-exercise-routinesview"
                            >
                              Guardar
                            </button>
                          )}
                          {editingExerciseId !== exercise.exercise_id && (
                            <button
                              className="delete-button-view-form"
                              onClick={() => openDeleteExerciseModal(exercise.exercise_id)}
                            >
                              Eliminar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>

              </table>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={isModalOpen}
        message={<>¿Estás seguro de que deseas eliminar <strong>{deleteType}</strong>? <br />Esta acción no se puede deshacer.</>}
        confirmAction={handleDeleteConfirm}
        cancelAction={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default RoutinesView;
