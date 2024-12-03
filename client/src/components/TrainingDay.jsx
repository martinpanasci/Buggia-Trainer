import React, { useState } from 'react';
import ExerciseSelector from './ExerciseSelector';

const TrainingDay = ({ day, routine, setRoutine, exercises }) => {
  const [dayName, setDayName] = useState(day.dayName);

  const handleDayNameChange = (e) => {
    setDayName(e.target.value);
    const updatedDays = routine.trainingDays.map(d =>
      d === day ? { ...d, dayName: e.target.value } : d
    );
    setRoutine({ ...routine, trainingDays: updatedDays });
  };

  const addExerciseDetails = (exerciseDetails) => {
    const updatedDays = routine.trainingDays.map(d =>
      d === day ? { ...d, exercises: [...d.exercises, exerciseDetails] } : d
    );
    setRoutine({ ...routine, trainingDays: updatedDays });
  };

  const removeExercise = (indexToRemove) => {
    const updatedDays = routine.trainingDays.map(d =>
      d === day ? { ...d, exercises: d.exercises.filter((_, index) => index !== indexToRemove) } : d
    );
    setRoutine({ ...routine, trainingDays: updatedDays });
  };

  return (
    <div className="training-day">
      <label>
        Nombre del Día de Entrenamiento:
        <input type="text" value={dayName} onChange={handleDayNameChange} />
      </label>

      <ExerciseSelector addExerciseDetails={addExerciseDetails} />

      <ul className="exercise-list">
        {day.exercises.map((exercise, index) => (
          <li key={index} className="exercise-item">
            <strong>
              {dayName} - {
                exercise.exercise_id
                  ? (exercises.find(ex => ex.id === exercise.exercise_id)?.name || 'Nombre no disponible')
                  : 'Ejercicio no definido'
              }
            </strong>
            : {exercise.reps} reps, {exercise.workingSets} working sets, {exercise.restTime} de descanso
            <button type="button" className="btn-delete" onClick={() => removeExercise(index)}>Eliminar</button>
          </li>
        ))}
      </ul>


    </div>
  );
};

export default TrainingDay;
