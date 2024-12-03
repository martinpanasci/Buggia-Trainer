import React, { useState, useEffect } from 'react';
import ConfirmModal from './ConfirmModal';
import './styles/RoutineAssign.css';

const RoutineAssign = () => {
  const [users, setUsers] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [assignedRoutines, setAssignedRoutines] = useState([]); // Rutinas asignadas al usuario seleccionado
  const [unassignedRoutines, setUnassignedRoutines] = useState([]); // Rutinas no asignadas
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const [selectedAssignedRoutine, setSelectedAssignedRoutine] = useState(null);
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3000/getUsers')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));

    fetch('http://localhost:3000/getRoutines')
      .then((response) => response.json())
      .then((data) => setRoutines(data))
      .catch((error) => console.error('Error fetching routines:', error));
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  useEffect(() => {
    if (selectedUser) {
      fetch(`http://localhost:3000/getUserRoutines/${selectedUser}`)
        .then((response) => response.json())
        .then((data) => {
          setAssignedRoutines(data); // Rutinas ya asignadas
          setUnassignedRoutines(routines.filter(r => !data.some(ar => ar.id === r.id))); // Rutinas no asignadas
        })
        .catch((error) => console.error('Error fetching user routines:', error));
    } else {
      setAssignedRoutines([]);
      setUnassignedRoutines([]);
    }
  }, [selectedUser, routines]);

  const openModal = (type) => {
    setActionType(type);
    setIsModalOpen(true);
    if (type === 'remove') {
      setSelectedRoutine(selectedAssignedRoutine);
    }
  };

  const handleConfirmAction = () => {
    const endpoint = actionType === 'assign' ? 'assignRoutine' : `removeRoutine/${selectedUser}/${selectedRoutine}`;
    const method = actionType === 'assign' ? 'POST' : 'DELETE';

    fetch(`http://localhost:3000/${endpoint}`, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: actionType === 'assign' ? JSON.stringify({ userId: selectedUser, routineId: selectedRoutine }) : null,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al ${actionType === 'assign' ? 'asignar' : 'remover'} la rutina`);
        }
        return response.json();
      })
      .then(() => {
        setIsModalOpen(false);
        setSelectedRoutine(null);        

        // Actualizar listas después de la acción
        if (actionType === 'assign') {
          setAssignedRoutines([...assignedRoutines, routines.find((r) => r.id === parseInt(selectedRoutine))]);
          setUnassignedRoutines(unassignedRoutines.filter((r) => r.id !== parseInt(selectedRoutine)));
        } else {
          setAssignedRoutines(assignedRoutines.filter((r) => r.id !== parseInt(selectedRoutine)));
          setUnassignedRoutines([...unassignedRoutines, routines.find((r) => r.id === parseInt(selectedRoutine))]);
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length > 0) {
      const results = users.filter((user) =>
        user.email.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user.id);
    setSearchTerm(user.email); // Muestra el nombre del usuario seleccionado en el input
    setSearchResults([]); // Limpia los resultados después de seleccionar un usuario
  };



  return (
    <div className="routine-assign">
      <h2 className="routine-assign__title">Asignar Rutinas a Usuarios</h2>

      <label className="routine-assign__label">
        Buscar Usuarios:
        <input
          type="text"
          className="routine-assign__input"
          placeholder="Escriba el nombre del usuario"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchResults.length > 0 && (
          <ul className="routine-assign__results">
            {searchResults.map((user) => (
              <li
                key={user.id}
                className="routine-assign__result-item"
                onClick={() => handleUserSelect(user)}
              >
                {user.email}
              </li>
            ))}
          </ul>
        )}

      </label>

      <label className="routine-assign__label">
        Seleccionar Usuario de la lista:
        <select
          className="routine-assign__select"
          value={selectedUser || ''}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Seleccione un usuario</option>
          {filteredUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
        </select>
      </label>

      <label className="routine-assign__label">
        Seleccionar Rutina para Asignar:
        <select
          className="routine-assign__select"
          value={selectedRoutine || ''}
          onChange={(e) => setSelectedRoutine(e.target.value)}
        >
          <option value="">Seleccione una rutina</option>
          {unassignedRoutines.map((routine) => (
            <option key={routine.id} value={routine.id}>
              {routine.name}
            </option>
          ))}
        </select>
      </label>

      <button
        className="btn btn-assign"
        onClick={() => openModal('assign')}
        disabled={!selectedUser || !selectedRoutine}
      >
        Asignar Rutina
      </button>

      <label className="routine-assign__label">
        Seleccionar Rutina para Quitar:
        <select
          className="routine-assign__select"
          value={selectedAssignedRoutine || ''}
          onChange={(e) => setSelectedAssignedRoutine(e.target.value)}
        >
          <option value="">Seleccione una rutina</option>
          {assignedRoutines.map((routine) => (
            <option key={routine.id} value={routine.id}>
              {routine.name}
            </option>
          ))}
        </select>
      </label>

      <button
        className="btn btn-remove"
        onClick={() => openModal('remove')}
        disabled={!selectedUser || !selectedAssignedRoutine}
      >
        Quitar Rutina
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        message={
          <>
            ¿Estás seguro de que deseas {actionType === 'assign' ? 'asignar' : 'quitar'} la rutina:
            <br />
            <strong>{routines.find((r) => r.id === parseInt(selectedRoutine))?.name}</strong>
            <br />
            para el usuario:
            <br />
            <strong>{users.find((u) => u.id === parseInt(selectedUser))?.email}</strong>?
          </>
        }
        confirmButtonText={actionType === 'assign' ? 'Asignar' : 'Quitar'}
        confirmAction={handleConfirmAction}
        cancelAction={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default RoutineAssign;
