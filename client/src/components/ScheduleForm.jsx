import React, { useState, useEffect } from 'react';
import './styles/ScheduleForm.css';

const ScheduleForm = () => {
  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [trainingDays, setTrainingDays] = useState([]); // Días de la rutina seleccionada
  const [numWeeks, setNumWeeks] = useState(0);
  const [daysPerWeek, setDaysPerWeek] = useState(0);
  const [routineSchedule, setRoutineSchedule] = useState([]);

  // Cargar todas las rutinas al montar el componente
  useEffect(() => {
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

  // Manejar la selección de una rutina específica
  const handleRoutineChange = async (e) => {
    const routineId = e.target.value;
    const routine = routines.find((r) => r.id === parseInt(routineId));
    setSelectedRoutine(routine);

    if (routine) {
      try {
        // Obtener los días de la rutina seleccionada
        const response = await fetch(`http://localhost:3000/getRoutineDays/${routineId}`);
        if (!response.ok) throw new Error('Error al obtener los días de la rutina');
        const daysData = await response.json();
        setTrainingDays(daysData); // Guarda los días de la rutina en el estado
      } catch (error) {
        console.error('Error al obtener los días de la rutina:', error);
      }
    } else {
      setTrainingDays([]);
    }
  };

  // Generar la tabla de planificación
  const handleGenerateTable = () => {
    setRoutineSchedule(Array.from({ length: numWeeks }, () => Array(daysPerWeek).fill(null)));
  };

  // Guardar la organización en la base de datos
  const handleSave = async () => {
    const formattedRoutineSchedule = routineSchedule.map((week, weekIndex) => {
      const weekData = {
        routine_id: selectedRoutine?.id,
        week_number: weekIndex + 1,
      };

      week.forEach((day, dayIndex) => {
        weekData[`day_${dayIndex + 1}`] = day;
      });

      return weekData;
    });

    try {
      const response = await fetch('http://localhost:3000/saveRoutineSchedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedRoutineSchedule),
      });

      if (!response.ok) throw new Error('Error al guardar la organización de la rutina');
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error al guardar la organización de la rutina:', error);
    }
  };

  return (
    <div className="schedule-form">
      <h2 className="schedule-form__title">Organizar Rutina</h2>
      
      <label className="schedule-form__label">
        Seleccionar Rutina:
        <select
          className="schedule-form__select"
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
        <div className="schedule-form__config">
          <label className="schedule-form__label">
            Número de semanas:
            <input
              className="schedule-form__input"
              type="number"
              value={numWeeks}
              onChange={(e) => setNumWeeks(parseInt(e.target.value))}
              min="1"
            />
          </label>
          <label className="schedule-form__label">
            Días por semana:
            <input
              className="schedule-form__input"
              type="number"
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}
              min="1"
              max="7"
            />
          </label>
          <button className="schedule-form__btn" onClick={handleGenerateTable}>Generar Tabla</button>
        </div>
      )}

      {routineSchedule.length > 0 && (
        <table className="schedule-form__table">
          <thead>
            <tr>
              <th>Semana</th>
              {Array.from({ length: daysPerWeek }, (_, i) => (
                <th key={i}>Día {i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {routineSchedule.map((week, weekIndex) => (
              <tr key={weekIndex}>
                <td>Semana {weekIndex + 1}</td>
                {week.map((day, dayIndex) => (
                  <td key={`${weekIndex}-${dayIndex}`}>
                    <select
                      className="schedule-form__day-select"
                      value={routineSchedule[weekIndex][dayIndex] || ''}
                      onChange={(e) => {
                        const updatedSchedule = [...routineSchedule];
                        updatedSchedule[weekIndex][dayIndex] = e.target.value ? parseInt(e.target.value) : null;
                        setRoutineSchedule(updatedSchedule);
                      }}
                    >
                      <option value="">Día Libre</option>
                      {trainingDays.map((day) => (
                        <option key={`day-${day.id}`} value={day.id}>
                          {day.day_name}
                        </option>
                      ))}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="schedule-form__btn-save" onClick={handleSave}>Guardar</button>
    </div>
  );
};

export default ScheduleForm;
