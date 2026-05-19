import { Modal, Button, ButtonToolbar } from 'rsuite';
import React from 'react';
import TicketForm from '../TicketForm/TicketForm';
import './CreateModal.scss';

interface Ifun{
  fun:()=>Promise<void>
}

const CreateModal = ({fun}:Ifun) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ButtonToolbar>
        <Button className='ticket-btn' onClick={handleOpen}  appearance='primary'>Ticket</Button>
      </ButtonToolbar>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          {/* <Modal.Title>Create Ticket</Modal.Title> */}
          <TicketForm fun={fun}/>
        </Modal.Header>
        <Modal.Body>
         {/* <TicketForm fun={fun}/> */}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateModal;