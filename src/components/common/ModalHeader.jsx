import React from "react";

const ModalHeader = props => {
  return (
    <div>
      <div className="modal-header">
        <h5 className="modal-title">{props.title}</h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={() => props.onClose()}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      {props.children}
    </div>
  );
};

export default ModalHeader;
