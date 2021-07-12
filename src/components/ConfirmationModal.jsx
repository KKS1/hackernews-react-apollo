import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function ConfirmationModal(props) {
  const {
    className,
    isOpen = false,
    title = 'Confirmation',
    onClose = () => {},
  } = props;

  return (
    <div>
      <Modal isOpen={isOpen} toggle={onClose} className={className}>
        <ModalHeader toggle={onClose}>{title}</ModalHeader>
        <ModalBody>Are you sure about that?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => onClose(e, true)}>
            Yes
          </Button>{' '}
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
