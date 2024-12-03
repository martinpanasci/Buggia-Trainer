import React, { useState, useEffect } from 'react';
import ConfirmModal from './ConfirmModal';
import './styles/DeletePrograms.css';

const DeletePrograms = () => {
    const [programs, setPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch programs from the backend
    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await fetch('http://localhost:3000/getPrograms');
                if (!response.ok) {
                    throw new Error('Error al obtener los programas');
                }
                const data = await response.json();
                console.log('Datos recibidos:', data); // Verifica lo que llega desde el backend
                setPrograms(data);
            } catch (error) {
                console.error('Error fetching programs:', error);
            }
        };

        fetchPrograms();
    }, []);


    const openModal = () => {
        if (!selectedProgram) {
            alert('Por favor, selecciona un programa antes de continuar.');
            return;
        }
        setIsModalOpen(true);
    };

    const handleDeleteProgram = () => {
        fetch(`http://localhost:3000/deleteProgram/${selectedProgram}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al eliminar el programa.');
                }
                return response.json();
            })
            .then(() => {
                setPrograms(programs.filter((program) => program.program_id !== parseInt(selectedProgram)));
                setSelectedProgram('');
                setIsModalOpen(false);
                alert('El programa se ha eliminado correctamente.'); // Agregado el alert
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Ocurrió un error al intentar eliminar el programa.');
            });
    };
    

    return (
        <div className="delete-programs-container">
            <h2>Eliminar Programas</h2>
            <label htmlFor="program-select" className="delete-programs-label">
                Selecciona un Programa:
                <select
                    id="program-select"
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="delete-programs-select"
                >
                    <option value="">Seleccione un programa</option>
                    {programs.map((program) => (
                        <option key={program.program_id} value={program.program_id}>
                            {program.routine_name}
                        </option>
                    ))}
                </select>
            </label>

            <button onClick={openModal} className="delete-programs-button">
                Eliminar Programa
            </button>

            <ConfirmModal
                isOpen={isModalOpen}
                message={<>¿Estás seguro de que deseas eliminar el programa seleccionado?</>}
                confirmAction={handleDeleteProgram}
                cancelAction={() => setIsModalOpen(false)}
                confirmButtonText="Eliminar"
            />
        </div>
    );
};

export default DeletePrograms;
