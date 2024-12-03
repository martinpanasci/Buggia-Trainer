import React from 'react';
import './styles/ModalInteractiveRoutine.css';

const ModalInteractiveRoutine = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="interactive-modal-overlay">
      <div className="interactive-modal-content">
        <p>{message}</p>
        <div className="interactive-modal-buttons">
          <button className="interactive-confirm-button" onClick={onConfirm}>
            Confirmar
          </button>
          <button className="interactive-cancel-button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalInteractiveRoutine;
