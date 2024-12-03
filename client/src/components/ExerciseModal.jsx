import React, { useState } from 'react';

const ExerciseModal = ({ closeModal, addExercise }) => {
    const [exercise, setExercise] = useState({ name: '', videoUrl: '' });

    const handleChange = (e) => {
        setExercise({ ...exercise, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch('http://localhost:3000/addExercises', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(exercise),
          });
  
          if (!response.ok) throw new Error('Error en la respuesta del servidor');
  
          const newExercise = await response.json();
          addExercise(newExercise); // Enviamos el ejercicio recién creado a `ExerciseSelector`
          closeModal();
      } catch (error) {
          console.error('Error al agregar el ejercicio:', error);
      }
  };
  

    return (
        <>
            <div className="exercise-modal-backdrop" onClick={closeModal}></div>
            <div className="exercise-modal">
                <h2>Agregar Nuevo Ejercicio</h2>
                <label>
                    Nombre:
                    <input type="text" name="name" value={exercise.name} onChange={handleChange} />
                </label>
                <label>
                    URL del Video:
                    <input type="text" name="videoUrl" value={exercise.videoUrl} onChange={handleChange} />
                </label>
                <button onClick={handleSave} className="btn">Guardar</button>
                <button onClick={closeModal} className="btn-secondary">Cerrar</button>
            </div>
        </>
    );
};

export default ExerciseModal;
