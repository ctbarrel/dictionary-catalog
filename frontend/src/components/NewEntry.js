import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import NewEntryForm from './NewEntryForm'

function NewEntryModal(props) {
  return (
    <Modal className='addmodal'
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className='input-form' closeButton>
        New Entry
          </Modal.Header>

      <Modal.Body>
        <NewEntryForm />
      </Modal.Body>
    </Modal>
  );
}

export default function NewEntry({ refresh }) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="outline-success" 
        onClick={() => {
        setModalShow(true)
      }}>
        Add a New Entry
      </Button>

      <NewEntryModal
        show={modalShow}
        onHide={() => {
          setModalShow(false)
          refresh()
        }}
      />
    </>
  );
}