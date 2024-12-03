import React from 'react';
import './styles/ConfirmModal.css';

const ConfirmModal = ({ isOpen, message, confirmAction, cancelAction, confirmButtonText }) => {
  if (!isOpen) return null; // No renderiza el modal si no está abierto

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-content">
        <h2>Confirmación</h2>
        <p>{message}</p>
        <div className="confirm-modal-buttons">
          <button className="confirm-modal-btn confirm" onClick={confirmAction}>{confirmButtonText || "Eliminar"}</button>
          <button className="confirm-modal-btn cancel" onClick={cancelAction}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
