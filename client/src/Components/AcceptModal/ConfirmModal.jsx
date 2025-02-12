import React from "react";


const ConfirmModal = ({ message, onConfirm, onCancel, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "active" : ""}`}>
      <div className="modal-content">
        <button className="close-button" onClick={onCancel}>&times;</button>
        <h1>Подтверждение</h1>
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="confirm" onClick={() => onConfirm(true)}>Да</button>
          <button className="cancel" onClick={() => onCancel(false)}>Нет</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;