import React from 'react';
import '../styles/Modal.scss';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
