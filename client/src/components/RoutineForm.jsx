import React, { useState, useEffect } from 'react';
import TrainingDay from './TrainingDay';
import './styles/RoutineForm.css';

const RoutineForm = () => {
  const [routine, setRoutine] = useState({
    name: '',
    trainingDays: [],
  });
  const [routines, setRoutines] = useState([]); // Estado para almacenar rutinas existentes
  const [isAddingNewRoutine, setIsAddingNewRoutine] = useState(false); // Estado para alternar entre selector y campo de texto
  const [exercises, setExercises] = useState([]);

  // Obtener las rutinas del backend cuando el componente se monte
  useEffect(() => {
    fetch('http://localhost:3000/getRoutines')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Datos obtenidos del backend:', data); // Verifica la respuesta del backend
        setRoutines(data);
      })
      .catch((error) => console.error('Error al cargar las rutinas:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/getExercises')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then((data) => setExercises(data)) // Guarda los ejercicios en el estado
      .catch((error) => console.error('Error al cargar los ejercicios:', error));
  }, []);

  const handleRoutineChange = (e) => {
    const selectedRoutineId = parseInt(e.target.value);
    const selectedRoutine = routines.find((routine) => routine.id === selectedRoutineId);

    if (selectedRoutine) {
      setRoutine({
        id: selectedRoutine.id,
        name: selectedRoutine.name,
        trainingDays: selectedRoutine.trainingDays || [], // Asegura que siempre sea un array
      });
    }
  }

  const handleNewRoutineNameChange = (e) => {
    setRoutine({ ...routine, name: e.target.value });
  };

  const addTrainingDay = () => {
    setRoutine({
      ...routine,
      trainingDays: [...routine.trainingDays, { dayName: '', exercises: [] }],
    });
  };

  const handleSaveRoutine = async () => {
    try {
      const response = await fetch('http://localhost:3000/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(routine), // Enviar la rutina en formato JSON
      });

      if (!response.ok) {
        throw new Error('Error al guardar la rutina');
      }
      console.log('Datos enviados al backend:', JSON.stringify(routine));
      const data = await response.json();
      console.log('Rutina guardada exitosamente:', data);
    } catch (error) {
      console.error('Error al enviar la rutina al backend:', error);
    }
  };


  return (
    <div className="routine-form">
      <h1>Cargar Rutina</h1>
      <form>
        <label>
          Nombre de la Rutina:
          {isAddingNewRoutine ? (
            <input
              type="text"
              name="name"
              value={routine.name}
              onChange={handleNewRoutineNameChange}
              placeholder="Ingresa el nombre de la nueva rutina"
            />
          ) : (
            <select onChange={handleRoutineChange} value={routine.id || ''}>
              <option value="">Selecciona una Rutina</option>
              {routines.map((routine) => (
                <option key={routine.id} value={routine.id}>{routine.name}</option>
              ))}
            </select>

          )}
        </label>

        <button
          type="button"
          className="btn-secondary"
          onClick={() => setIsAddingNewRoutine(!isAddingNewRoutine)}
        >
          {isAddingNewRoutine ? 'Seleccionar Rutina Existente' : 'Agregar Nueva Rutina'}
        </button>

        <button type="button" className="btn" onClick={addTrainingDay}>Agregar Día de Entrenamiento</button>

        {routine.trainingDays && routine.trainingDays.length > 0 && routine.trainingDays.map((day, index) => (
          <TrainingDay key={index} day={day} routine={routine} setRoutine={setRoutine} exercises={exercises} />
        ))}

        <button type="button" className="btn" onClick={handleSaveRoutine}>Guardar Rutina</button>
      </form>
    </div>
  );
};

export default RoutineForm;
