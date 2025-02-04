import React from 'react';
import PropTypes from 'prop-types';
import './modal.css';

export default function AcceptModal({ msg, onAccept, onReject, onClose }) {
  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h4 id="modal-title">{msg}</h4>
        <div className="modal-buttons">
          <button onClick={onAccept}>Да</button>
          <button onClick={onReject}>Нет</button>
        </div>
      </div>
    </>
  );
}

