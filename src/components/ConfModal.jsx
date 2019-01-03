import React from "react";
import Modal from "react-modal";

Modal.setAppElement(document.getElementById("root"));

const ConfModal = props => {
  console.log(props);
  const modal = props.modal;
  return (
    <Modal isOpen={modal.show} onRequestClose={props.onClose}>
      <div class="modal-header">
        <h5 class="modal-title">Confirm Action</h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={() => props.onClose()}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <button type="button" class="btn btn-primary">
        Save changes
      </button>
    </Modal>
  );
};

export default ConfModal;
