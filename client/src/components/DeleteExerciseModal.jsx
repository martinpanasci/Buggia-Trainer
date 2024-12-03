import React, { useState } from 'react';

const DeleteExerciseModal = ({ exercises, closeModal, deleteExercise }) => {
  const [selectedExerciseId, setSelectedExerciseId] = useState('');

  const handleDelete = () => {
    if (selectedExerciseId) {
      deleteExercise(selectedExerciseId);
      closeModal();
    }
  };

  return (
    <div className="delete-modal-backdrop">
      <div className="delete-modal">
        <h3>Eliminar Ejercicio</h3>
        <select onChange={(e) => setSelectedExerciseId(e.target.value)} value={selectedExerciseId}>
          <option value="">Selecciona un Ejercicio para Eliminar</option>
          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          ))}
        </select>
        <div className="delete-modal-buttons">
        <button className="btn-danger" onClick={handleDelete}>Eliminar</button>
        <button className="delete-btn-secondary" onClick={closeModal}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteExerciseModal;
