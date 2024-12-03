import React, { useState, useEffect } from 'react';
import ExerciseModal from './ExerciseModal';
import DeleteExerciseModal from './DeleteExerciseModal';

const ExerciseSelector = ({ addExerciseDetails }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exercises, setExercises] = useState([]);   
  const [exerciseDetails, setExerciseDetails] = useState({
    lastSetTechnique: '',
    warmupSets: '',
    workingSets: '',
    reps: '',
    earlySetRPE: '',
    lastSetRPE: '',
    restTime: '',
    substitution1: '',
    substitution2: '',
    notes: '',
  });


  // Obtener ejercicios del backend cuando el componente se monta
  useEffect(() => {
    fetch('http://localhost:3000/getExercises')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Datos obtenidos del backend:', data); // Verifica aquí la estructura de la respuesta
        setExercises(data);
      })
      .catch((error) => console.error('Error al cargar los ejercicios:', error));
  }, []);


  const handleAddExercise = (e) => {
    const selected = exercises.find(ex => ex.id === parseInt(e.target.value));
    setSelectedExercise(selected);
    console.log("Datos de selectedExercise después de seleccionar:", selected); // Añade esta línea para verificar el valor
  };

  const handleDetailsChange = (e) => {
    setExerciseDetails({ ...exerciseDetails, [e.target.name]: e.target.value });
  };

  const handleSaveDetails = () => {
    if (!selectedExercise) {
      console.error("No se ha seleccionado un ejercicio.");
      return;
    }
    addExerciseDetails({
      exercise_id: selectedExercise.id,
      lastSetTechnique: exerciseDetails.lastSetTechnique,
      warmupSets: exerciseDetails.warmupSets,
      workingSets: exerciseDetails.workingSets,
      reps: exerciseDetails.reps,
      earlySetRPE: exerciseDetails.earlySetRPE,
      lastSetRPE: exerciseDetails.lastSetRPE,
      restTime: exerciseDetails.restTime,
      substitution1: exerciseDetails.substitution1,
      substitution2: exerciseDetails.substitution2,
      notes: exerciseDetails.notes,
    });

    setSelectedExercise(null);
    setExerciseDetails({
      lastSetTechnique: '',
      warmupSets: '',
      workingSets: '',
      reps: '',
      earlySetRPE: '',
      lastSetRPE: '',
      restTime: '',
      substitution1: '',
      substitution2: '',
      notes: '',
    });
  };

  const handleNewExercise = (newExercise) => {
    const exerciseToAdd = { id: newExercise.id, name: newExercise.name };
    setExercises((prevExercises) => [...prevExercises, exerciseToAdd]);
    setShowModal(false);
  };

  const handleDeleteExercise = async (exerciseId) => {
    try {      
      const response = await fetch(`http://localhost:3000/deleteExercise/${exerciseId}`, {
        method: 'DELETE',
      });      
      if (!response.ok) throw new Error('Error al eliminar el ejercicio');  
      setExercises((prevExercises) => prevExercises.filter((ex) => ex.id !== parseInt(exerciseId)));
    } catch (error) {
      console.error('Error al eliminar el ejercicio:', error);
    }
  };
  
  return (
    <div className="exercise-selector">
      <select onChange={handleAddExercise}>
        <option value="">Selecciona un Ejercicio</option>
        {exercises.map((ex) => (
          <option key={ex.id} value={ex.id}>{ex.name}</option>
        ))}
      </select>
      <button type="button" className="btn-secondary" onClick={() => setShowModal(true)}>
        Agregar Nuevo Ejercicio
      </button>
      <button type="button" className="btn-danger" onClick={() => setShowDeleteModal(true)}>
        Eliminar Ejercicio
      </button>

      {showModal && <ExerciseModal closeModal={() => setShowModal(false)} addExercise={handleNewExercise} />}
      {showDeleteModal && (
        <DeleteExerciseModal exercises={exercises}
          closeModal={() => setShowDeleteModal(false)}
          deleteExercise={handleDeleteExercise}
        />
      )}

      {selectedExercise && (
        <div className="exercise-details-form">
          <h4>Detalles de Ejercicio: {selectedExercise.name}</h4>
          <label>
            Técnica del Último Set:
            <input type="text" name="lastSetTechnique" value={exerciseDetails.lastSetTechnique} onChange={handleDetailsChange} />
          </label>
          <label>
            Sets de Calentamiento:
            <input type="text" name="warmupSets" value={exerciseDetails.warmupSets} onChange={handleDetailsChange} />
          </label>
          <label>
            Working Sets:
            <input type="text" name="workingSets" value={exerciseDetails.workingSets} onChange={handleDetailsChange} />
          </label>
          <label>
            Reps:
            <input type="text" name="reps" value={exerciseDetails.reps} onChange={handleDetailsChange} />
          </label>
          <label>
            Early Set RPE:
            <input type="text" name="earlySetRPE" value={exerciseDetails.earlySetRPE} onChange={handleDetailsChange} />
          </label>
          <label>
            Last Set RPE:
            <input type="text" name="lastSetRPE" value={exerciseDetails.lastSetRPE} onChange={handleDetailsChange} />
          </label>
          <label>
            Rest Time:
            <input type="text" name="restTime" value={exerciseDetails.restTime} onChange={handleDetailsChange} />
          </label>

          <label>
            Sustitución 1:
            <select name="substitution1" value={exerciseDetails.substitution1} onChange={handleDetailsChange}>
              <option value="">Selecciona Sustitución 1</option>
              {exercises.map((ex) => (
                <option key={ex.id} value={ex.id}>{ex.name}</option>
              ))}
            </select>
          </label>

          <label>
            Sustitución 2:
            <select name="substitution2" value={exerciseDetails.substitution2} onChange={handleDetailsChange}>
              <option value="">Selecciona Sustitución 2</option>
              {exercises.map((ex) => (
                <option key={ex.id} value={ex.id}>{ex.name}</option>
              ))}
            </select>
          </label>

          <label>
            Notas:
            <textarea name="notes" className="exercise-notes" value={exerciseDetails.notes} onChange={handleDetailsChange}></textarea>
          </label>

          <button type="button" className="btn" onClick={handleSaveDetails}>Guardar Detalles</button>
        </div>
      )}
    </div>
  );
};

export default ExerciseSelector;
