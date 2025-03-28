// Modal.js
import React from 'react';
import './Modal.css'; // Import CSS for styling

const Modal = ({ isOpen, onClose, onSelect, userId, providerId }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content dark:bg-boxdark dark:text-bodydark">
        <div className="select-buttons">
          <button className='button dark:bg-boxdark-2 dark:text-bodydark dark:hover:bg-primary' onClick={() => onSelect('given', userId, providerId)}>
            Reviews given by this user
          </button>
          <button className='button dark:bg-boxdark-2 dark:text-bodydark dark:hover:bg-primary' onClick={() => onSelect('received', userId, providerId)}>
            Reviews received by this provider
          </button>
        </div>
        <button className="close-button button dark:bg-boxdark-2 dark:text-bodydark dark:hover:bg-meta-1" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;