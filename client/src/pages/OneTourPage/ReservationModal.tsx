import React from "react";
import Modal from "react-modal";


const IndexModal = ({ order, isOpen, onClose }) => {

  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Бронь">
        <button onClick={onClose}>Закрыть</button>
        
      </Modal>
    </div>
  );
};

export default IndexModal;